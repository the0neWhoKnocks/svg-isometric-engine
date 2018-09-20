import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, string } from 'prop-types';
import Flyout, {
  RIGHT,
} from 'COMPONENTS/Flyout';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  setProject,
} from 'STATE/actions';
import {
  getProject,
  getProjects,
} from 'STATE/selectors';
import styles from './styles';

const navProps = (state) => ({
  project: getProject(state),
  projects: getProjects(state),
});
const navActions = () => ({
  setProject,
});

class TopNav extends Component {
  constructor(props) {
    super();

    this.handleProjectSelect = this.handleProjectSelect.bind(this);
  }

  handleProjectSelect(ev) {
    this.props.setProject( ev.currentTarget.dataset.project );
    window.flyout.closeAll();
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
            expandOnHover
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
                onClick={ this.handleProjectSelect }
                data-project={ project }
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
  setProject: func,
};

export default connect(navProps, navActions)(TopNav);
