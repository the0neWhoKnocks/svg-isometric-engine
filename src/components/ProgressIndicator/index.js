import React, { Component } from 'react';
import { bool, number, string } from 'prop-types';
import styles from './styles';

class ProgressIndicator extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      max,
      message,
      min,
      overlay,
      value,
      visible,
    } = this.props;
    const visibleClass = (visible) ? ' is--visible' : '';
    const overlayClass = (overlay) ? ' is--overlay' : '';

    return (
      <div
        className={`progress ${ styles.root }${ visibleClass }${ overlayClass }`}
      >
        <div className={`progress__container ${ styles.container }`}>
          <progress
            className={`${ styles.progress }`}
            min={ min }
            max={ max }
            value={ value }
          >{ value }</progress>
          {message !== undefined && (
            <div
              className={`progress__msg ${ styles.message }`}
            >{ message }</div>
          )}
        </div>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  max: number,
  message: string,
  min: number,
  overlay: bool,
  value: number,
  visible: bool,
};

ProgressIndicator.defaultProps = {
  max: 100,
  min: 0,
  overlay: false,
  value: 0,
  visible: false,
};

export default ProgressIndicator;
