import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';
import Flyout, {
  RIGHT,
} from 'COMPONENTS/Flyout';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  getProject,
  getProjects,
} from 'STATE/selectors';
import styles from './styles';

const navProps = (state) => ({
  project: getProject(state),
  projects: getProjects(state),
});

class TopNav extends Component {
  constructor() {
    super();
  }
  
  render() {
    const {
      project,
      projects,
    } = this.props;
    
    return (
      <nav className={`${ styles.root }`}>
        <Flyout
          id="topNavFileBtn"
          label="File"
        >
          <Flyout
            btnClass="has--icon"
            id="fileSubNavLoadBtn"
            label={(
              <Fragment>
                Load
                <SvgIcon name="arrow_right" />
              </Fragment>
            )}
            position={ RIGHT }
          >
            {projects.map((project, ndx) => (
              <button
                key={ ndx }
                className={`${ styles.projectBtns }`}
              >{`projects/ ${ project }`}</button>
            ))}
          </Flyout>
          <button>Import</button>
          <button>Export</button>
        </Flyout>
        <div className={`${ styles.projectTitle }`}>{ project }</div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  project: string,
  projects: arrayOf(string),
};

export default connect(navProps)(TopNav);