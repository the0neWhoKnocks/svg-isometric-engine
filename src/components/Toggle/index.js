import React, { Component } from 'react';
import { bool, func, node, string } from 'prop-types';
import styles from './styles';

class Toggle extends Component {
  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if(props.title !== state.title) newState.title = props.title;

    return (Object.keys(newState).length) ? newState : null;
  }

  constructor(props) {
    super();

    this.state = {
      title: props.title,
      toggled: props.toggled,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(ev) {
    const toggled = ev.currentTarget.checked;
    this.setState({
      toggled,
    }, () => {
      this.props.onToggle(toggled);
    });
  }

  render() {
    const {
      children,
      id,
      suffix,
    } = this.props;
    const {
      title,
      toggled,
    } = this.state;
    const toggleId = `${ id }Toggle`;
    let toggleStyles = `${ styles.baseToggle }`;
    let checkboxStyles = `${ styles.baseCheckbox }`;
    let labelStyles = `${ styles.baseLabel }`;
    let childEl;

    if(!children){
      toggleStyles += ` ${ styles.toggle }`;
      checkboxStyles += ` ${ styles.checkbox }`;
      labelStyles += ` ${ styles.label }`;
    }
    else{
      toggleStyles += ' is--custom';
      childEl = <div className="toggle__sprite">{ children }</div>;
    }

    return (
      <div className="toggle">
        <div className={ toggleStyles }>
          <input
            className={ checkboxStyles }
            id={ toggleId }
            type="checkbox"
            onChange={ this.handleToggle }
            checked={ toggled }
          />
          <label
            className={ labelStyles }
            htmlFor={ toggleId }
            title={ title }
          >{ childEl }</label>
        </div>
        {suffix && (
          <label>{suffix}</label>
        )}
      </div>
    );
  }
}

Toggle.propTypes = {
  children: node,
  id: string,
  suffix: string,
  onToggle: func,
  title: string,
  toggled: bool,
};
Toggle.defaultProps = {
  id: 'default',
  toggled: false,
};

export default Toggle;
