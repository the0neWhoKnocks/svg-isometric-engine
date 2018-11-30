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
    };

    if(props.editable){
      this.handleLayerSelect = this.handleLayerSelect.bind(this);
      this.handleLock = this.handleLock.bind(this);
      this.handleNameBlur = this.handleNameBlur.bind(this);
      this.handleNameClick = this.handleNameClick.bind(this);
      this.handleNameKeys = this.handleNameKeys.bind(this);
    }
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  handleLayerSelect(ev) {
    if(ev.target.classList.contains('layer__name')){
      ev.preventDefault();
    }
  }

  handleLock(locked) {
    this.props.onLock(this.props.ndx, locked);
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
      this.handleNameUpdate();
    }
  }

  handleNameBlur(ev) {
    this.handleNameUpdate();
  }

  handleNameUpdate() {
    this.setState({
      editName: false,
    }, () => {
      const newName = this.nameInput.innerText;
      if(newName !== this.props.name){
        this.props.onNameChange(this.props.ndx, newName);
      }
    });
  }

  handleVisibility(visible) {
    this.props.onVisibility(this.props.ndx, visible);
  }

  render() {
    const {
      current,
      editable,
      locked,
      name,
      ndx,
      onSelect,
      thumbnail,
      visible,
    } = this.props;
    const {
      editName,
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
          disabled={ !editable }
        />
        <label
          className={`layer ${ styles.layer }`}
          htmlFor={ uid }
          onClick={ this.handleLayerSelect }
        >
          <nav className="layer__nav">
            <Toggle
              id={`${ uid }_vis`}
              onToggle={ this.handleVisibility }
              title={ `${ (visible) ? 'Hide' : 'Show' } Layer` }
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
            {editable && (
              <Toggle
                id={`${ uid }_lock`}
                onToggle={ this.handleLock }
                title={ `${ (locked) ? 'Un-Lock' : 'Lock' } Layer` }
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
            )}
            {!editable && (
              <SvgIcon
                className="layer__toggle-icon is--disabled"
                name="locked"
              />
            )}
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
            title={ (editable) ? 'Double-click to edit layer name' : undefined}
            onBlur={ (editable) ? this.handleNameBlur : undefined }
            onDoubleClick={ (editable) ? this.handleNameClick : undefined }
            onKeyDown={ (editable) ? this.handleNameKeys : undefined }
          >
            { name }
          </div>
        </label>
      </div>
    );
  }
}

Layer.defaultProps = {
  current: false,
  editable: true,
  locked: false,
  visible: true,
};
Layer.propTypes = {
  current: bool,
  editable: bool,
  onLock: func.isRequired,
  onNameChange: func.isRequired,
  onSelect: func.isRequired,
  onVisibility: func.isRequired,
  ...RAW_LAYER,
};

export default Layer;
