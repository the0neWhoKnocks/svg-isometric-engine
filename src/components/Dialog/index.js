import React, { Component } from 'react';
import { bool, node } from 'prop-types';
import SvgIcon from 'COMPONENTS/SvgIcon';
import styles from './styles';

class Dialog extends Component {
  constructor(props) {
    super();
    
    this.state = {
      opened: props.opened || false,
    };
    this.handleClose = this.handleClose.bind(this);
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
      modal,
    } = this.props;
    const { opened } = this.state;
    
    if(!opened) return null;
    
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
  modal: bool,
  opened: bool,
};

export default Dialog;