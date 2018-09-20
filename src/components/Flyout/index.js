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
  }
  
  handleExternalClick(ev) {
    const el = ev.target;
    
    if( !this.flyoutRef.contains(el) ){
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
        });
      }
    });
  }
  
  render() {
    const {
      btnClass,
      children,
      id,
      label,
      position,
    } = this.props;
    const {
      opened,
    } = this.state;
    
    return (
      <div
        className={`flyout ${ styles.root }`}
        ref={(ref) => { this.flyoutRef = ref; }}
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