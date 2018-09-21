import React, { Component } from 'react';
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
      mounted,
      opened,
    } = this.state;

    if(!mounted || !opened) return null;

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
          <div className={`dialog__content ${ styles.content }`}>
            { error && (
              <div className={`${ styles.errorMsg }`}>{ error.data }</div>
            )}
            { children }
          </div>
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
