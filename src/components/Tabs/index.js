import React, { Component, Fragment } from 'react';
import { arrayOf, node, shape, string } from 'prop-types';
import SvgIcon from 'COMPONENTS/SvgIcon';
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
    const {
      className,
      items,
    } = this.props;
    const { tabNdx } = this.state;

    return (
      <div className={`tabs ${ styles.root } ${ className }`}>
        <nav className={`tabs__nav ${ styles.tabBtnsNav }`}>{
          items.map(({ icon, label }, ndx) => (
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
                { icon && (
                  <SvgIcon
                    className="tab-icon"
                    name={ icon }
                  />
                )}
                { label }
              </label>
            </Fragment>
          ))
        }</nav>
        <div className={`tabs__tab ${ styles.currentTab }`}>
          { items[tabNdx].content }
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  className: string,
  items: arrayOf(shape({
    content: node.isRequired,
    icon: string,
    label: string.isRequired,
  })),
};

export default Tabs;
