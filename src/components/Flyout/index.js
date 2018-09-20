import React, { Component } from 'react';
import { bool, node, oneOfType, string } from 'prop-types';
import styles, {
  TOP,
  BOTTOM,
  RIGHT,
  LEFT,
  positions,
} from './styles';

class Flyout extends Component {
  constructor(props) {
    super();

    this.state = {
      opened: props.opened,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
    this.handleBtnHover = this.handleBtnHover.bind(this);
    this.handleBtnLeave = this.handleBtnLeave.bind(this);

    if(process.env.IS_CLIENT){
      if(!window.flyout) window.flyout = {
        closeAll: this.closeAll,
      };
    }
  }

  closeAll() {
    window.flyout.handlers.reverse().forEach((handler) => {
      handler();
    });
    delete window.flyout.handlers;
  }

  handleBtnHover(ev) {
    this.toggle(true);
  }

  handleBtnLeave(ev) {
    this.toggle(false);
  }

  handleExternalClick(ev = {}) {
    const el = ev.target;

    if( !el || !this.flyoutRef.contains(el) ){
      window.removeEventListener('click', this.handleExternalClick);
      this.toggle(false);
    }
  }

  handleChange(ev) {
    this.toggle( !!ev.currentTarget.checked );
  }

  toggle(opened) {
    this.setState({
      opened,
    }, () => {
      if(opened){
        window.requestAnimationFrame(() => {
          window.addEventListener('click', this.handleExternalClick);

          if(!window.flyout.handlers) window.flyout.handlers = [];
          window.flyout.handlers.push(this.handleExternalClick);
        });
      }
    });
  }

  render() {
    const {
      btnClass,
      children,
      expandOnHover,
      id,
      label,
      position,
    } = this.props;
    const {
      opened,
    } = this.state;
    const btnProps = {};

    if(expandOnHover){
      btnProps.onMouseOver = this.handleBtnHover;
      btnProps.onMouseLeave = this.handleBtnLeave;
    }

    return (
      <div
        className={`flyout ${ styles.root }`}
        ref={(ref) => { this.flyoutRef = ref; }}
        { ...btnProps }
      >
        <input
          id={ id }
          type="checkbox"
          checked={ opened }
          onChange={ this.handleChange }
        />
        <label
          className={`flyout__btn ${ styles.label } ${ btnClass }`}
          htmlFor={ id }
          tabIndex="0"
        >{ label }</label>
        <div
          className={`flyout__content-wrapper ${ positions[position] } ${ styles.contentWrapper }`}
        >
          <div className="flyout__content">{ children }</div>
        </div>
      </div>
    );
  }
}

Flyout.propTypes = {
  btnClass: string,
  children: node,
  expandOnHover: bool,
  id: string.isRequired,
  label: oneOfType([
    node,
    string,
  ]),
  opened: bool,
  position: string,
};
Flyout.defaultProps = {
  btnClass: '',
  expandOnHover: false,
  label: 'DD Btn',
  opened: false,
  position: BOTTOM,
};

export default Flyout;
export {
  TOP,
  BOTTOM,
  RIGHT,
  LEFT,
};
