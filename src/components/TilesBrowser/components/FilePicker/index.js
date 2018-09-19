import React, { Component } from 'react';
import { arrayOf, bool, func, node, oneOfType, string } from 'prop-types';
import styles from './styles';

class FilePicker extends Component {
  constructor(props) {
    super();

    this.state = {};
    this.acceptedFormats = (!Array.isArray(props.accept))
      ? [props.accept]
      : props.accept;
    this.handleChosenFiles = this.handleChosenFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    this.inputRef.click(ev);
  }

  handleChosenFiles(ev) {
    const { onFilesChosen } = this.props;
    const rawFiles = ev.currentTarget.files;
    const parsedFiles = [];
    const acceptedTypes = new RegExp(`${ this.acceptedFormats.join('|') }`);

    for(let i=0; i<rawFiles.length; i++){
      const currFile = rawFiles[i];

      // Only process allowed files.
      if( !acceptedTypes.test(currFile.type) ){
        alert( `"${ currFile.name }" isn't an allowed file type.\nAllowed file types: ${ this.acceptedFormats.join(', ') }` );
        continue;
      }

      parsedFiles.push(currFile);
    }

    onFilesChosen(parsedFiles);
  }

  render() {
    const {
      allowDirectory,
      allowMultiple,
      btnLabel,
      btnTooltip,
      className,
    } = this.props;
    const inputProps = {
      accept: this.acceptedFormats.join(','),
    };

    // multiple file selections allowed
    if(allowMultiple) inputProps.multiple = 'true';
    // entire directories allowed
    if(allowDirectory) {
      inputProps.mozdirectory = 'true';
      inputProps.webkitdirectory = 'true';
    }

    return (
      <div className={`${ styles.root } ${ className }`}>
        <button
          type="button"
          className={`${ styles.chooseBtn }`}
          onClick={ this.handleClick }
        >{ btnLabel }</button>
        <input
          ref={ (ref) => { this.inputRef = ref; } }
          className={`${ styles.fileInput }`}
          type="file"
          title={ btnTooltip }
          onChange={ this.handleChosenFiles }
          tabIndex="-1"
          { ...inputProps }
        />
      </div>
    );
  }
}

FilePicker.propTypes = {
  accept: oneOfType([
    arrayOf(string),
    string,
  ]),
  allowDirectory: bool,
  allowMultiple: bool,
  btnLabel: oneOfType([
    node,
    string,
  ]),
  btnTooltip: string,
  className: string,
  onFilesChosen: func.isRequired,
};
FilePicker.defaultProps = {
  accept: [],
  btnLabel: 'Choose File',
  btnTooltip: 'Choose File',
};

export default FilePicker;
