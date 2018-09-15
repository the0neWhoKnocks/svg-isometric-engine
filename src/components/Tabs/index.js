import React, { Component, Fragment } from 'react';
import { arrayOf, node, shape, string } from 'prop-types';
import styles from './styles';

class Tabs extends Component {
  constructor(props) {
    super();

    this.state = {
      tabNdx: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.setState({
      tabNdx: +ev.currentTarget.value,
    });
  }

  render() {
    const { items } = this.props;
    const { tabNdx } = this.state;

    return (
      <div className={`${ styles.root }`}>
        <nav className={`${ styles.tabBtnsNav }`}>{
          items.map(({ label }, ndx) => (
            <Fragment key={ label }>
              <input
                className={`${ styles.tabBtnInput }`}
                id={ `tabBtn_${ ndx }` }
                type="checkbox"
                value={ ndx }
                onChange={ this.handleChange }
                checked={ tabNdx === ndx }
              />
              <label
                className={`tab-btn ${ styles.tabBtn }`}
                htmlFor={ `tabBtn_${ ndx }` }
              >
                { label }
              </label>
            </Fragment>
          ))
        }</nav>
        <div className={`${ styles.tabs }`}>
          { items[tabNdx].content }
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  items: arrayOf(shape({
    label: string,
    content: node,
  })),
};

export default Tabs;
