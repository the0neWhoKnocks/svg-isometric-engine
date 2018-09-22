import React, { Component, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { bool, node, number, shape, string } from 'prop-types';
import SvgIcon from 'COMPONENTS/SvgIcon';
import styles from './styles';

class Dialog extends Component {
  static getDerivedStateFromProps(props, state){
    const { error, opened } = props;

    if(
      opened !== state.opened
      || error !== state.error
    ) return {
      error,
      opened,
    };

    return null;
  }

  constructor(props) {
    super();

    this.state = {
      mounted: false,
      opened: props.opened,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  handleClose() {
    this.setState({
      opened: false,
    });
  }

  render() {
    const {
      children,
      disableClose,
      error,
      modal,
    } = this.props;
    const {
      opened,
    } = this.state;
    const contentProps = {};
    const contentChildren = [];

    if(!opened) return null;

    // errors go first
    if( error ){
      contentChildren.push(
        <div className={`${ styles.errorMsg }`}>{ error.data }</div>
      );
    }
    // then any other content
    contentChildren.push(children);

    // Render all content children (errors, etc) if `children` is a String.
    // The common use case for `children` being a String is if the Server
    // needed to render a Dialog and the state was set to a String.
    if( typeof children === 'string' ){
      contentProps.dangerouslySetInnerHTML = {
        __html: contentChildren.map((i) => {
          return (typeof i !== 'string') ? renderToStaticMarkup(i) : i;
        }).join(''),
      };
    }
    // The rest of the time `children` should be a JSX Object. In order to
    // use an Array, Fragment has to be used otherwise warnings are thrown
    // about "missing unique keys".
    else{
      contentProps.children = contentChildren.map((I, ndx) => {
        return <Fragment key={ndx}>{I}</Fragment>;
      });
    }

    return (
      <div className={`dialog ${ styles.absFill } ${ styles.root }`}>
        {modal && (
          <div className={`dialog__overlay ${ styles.absFill } ${ styles.overlay }`}></div>
        )}
        <div className={`dialog__body ${ styles.body }`}>
          <nav className={`dialog__nav ${ styles.nav }`}>
            <button
              title="Close"
              onClick={ this.handleClose }
              disabled={ disableClose }
            >
              <SvgIcon name="close" />
            </button>
          </nav>
          <div
            className={`dialog__content ${ styles.content }`}
            { ...contentProps }
          />
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  children: node,
  disableClose: bool,
  error: shape({
    data: string,
    status: number,
    statusText: string,
  }),
  modal: bool,
  opened: bool,
};
Dialog.defaultProps = {
  opened: false,
};

export default Dialog;
