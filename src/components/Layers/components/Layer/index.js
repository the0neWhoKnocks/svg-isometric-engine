import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import {
  RAW_LAYER,
} from 'CONSTANTS/propTypes';
import SvgIcon from 'COMPONENTS/SvgIcon';
import Toggle from 'COMPONENTS/Toggle';
import styles from './styles';

class Layer extends Component {
  constructor(props) {
    super();

    this.state = {
      editName: false,
      locked: props.locked,
      name: props.name,
      ndx: props.ndx,
      visible: props.visible,
    };

    this.handleLock = this.handleLock.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleNameKeys = this.handleNameKeys.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  handleLock(locked) {
    this.props.onLock(this.state.ndx, locked);
  }

  handleNameChange(ev) {
    this.setState({
      name: ev.currentTarget.value,
    });
  }

  handleNameClick(ev) {
    this.setState({
      editName: true,
    }, () => {
      this.nameInput.focus();
    });
  }

  handleNameKeys(ev) {
    if(ev.which === 13) {
      ev.preventDefault(); // prevent new lines
      this.setState({
        editName: false,
      });
    }
  }

  handleNameBlur(ev) {
    this.setState({
      editName: false,
    });
  }

  handleVisibility(visible) {
    this.props.onVisibility(this.state.ndx, visible);
  }

  render() {
    const {
      current,
      onSelect,
      thumbnail,
    } = this.props;
    const {
      locked,
      name,
      editName,
      ndx,
      visible,
    } = this.state;
    const uid = `layer_${ ndx }`;

    return (
      <div className="layer-container">
        <input
          id={ uid }
          type="checkbox"
          className={`${ styles.layerInput }`}
          checked={ current }
          onChange={ onSelect }
          value={ ndx }
        />
        <label
          className={`layer ${ styles.layer }`}
          htmlFor={ uid }
          title={ name }
        >
          <nav className="layer__nav">
            <Toggle
              id={`${ uid }_vis`}
              onToggle={ this.handleVisibility }
              toggled={ visible }
            >
              <SvgIcon
                className="layer__toggle-icon"
                name="visibility_off"
              />
              <SvgIcon
                className="layer__toggle-icon"
                name="visibility"
              />
            </Toggle>
            <Toggle
              id={`${ uid }_lock`}
              onToggle={ this.handleLock }
              toggled={ locked }
            >
              <SvgIcon
                className="layer__toggle-icon"
                name="unlocked"
              />
              <SvgIcon
                className="layer__toggle-icon"
                name="locked"
              />
            </Toggle>
          </nav>
          <div className="layer__thumbnail-wrapper">
            <img className="layer__thumbnail" src={ thumbnail } alt="thumbnail" />
          </div>
          <div
            ref={ (ref) => this.nameInput = ref }
            className="layer__name"
            contentEditable={ editName }
            suppressContentEditableWarning={true}
            spellCheck="false"
            onBlur={ this.handleNameBlur }
            onDoubleClick={ this.handleNameClick }
            onKeyDown={ this.handleNameKeys }
          >
            { name }
          </div>
        </label>
      </div>
    );
  }
}

{/* <input
  ref={ (ref) => this.nameInput = ref }
  className="layer__name"
  type="text"
  value={ name }
  onChange={ this.handleNameChange }
  onBlur={ this.handleNameBlur }
  disabled={ nameDisabled }
  size="1"
/> */}

Layer.defaultProps = {
  locked: false,
  visible: true,
};
Layer.propTypes = {
  current: bool,
  onLock: func.isRequired,
  onSelect: func.isRequired,
  onVisibility: func.isRequired,
  ...RAW_LAYER,
};

export default Layer;
