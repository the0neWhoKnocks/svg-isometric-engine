import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Flyout, {
  RIGHT,
} from 'COMPONENTS/Flyout';
import SvgIcon from 'COMPONENTS/SvgIcon';
import {
  PROJECT,
  PROJECTS,
} from 'CONSTANTS/propTypes';
import {
  fetchProject,
} from 'STATE/Builder/actions';
import {
  getProject,
  getProjects,
} from 'STATE/Builder/selectors';
import styles from './styles';

const navProps = (state) => ({
  project: getProject(state),
  projects: getProjects(state),
});
const navActions = () => ({
  fetchProject,
});

class TopNav extends Component {
  constructor(props) {
    super();

    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleProjectSelect = this.handleProjectSelect.bind(this);
  }

  handleProjectSelect(ev) {
    const {
      projects,
      fetchProject,
    } = this.props;
    const projectNdx = ev.currentTarget.dataset.project;
    fetchProject( projects[projectNdx].uid );
    window.flyout.closeAll();
  }

  handleProjectSave(ev) {
    const { onSave } = this.props;

    if(onSave) onSave();
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
          label="Project"
        >
          <Flyout
            btnClass="has--icon"
            expandOnHover
            id="fileSubNavLoadBtn"
            label={(
              <Fragment>
                Open
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
                data-project={ ndx }
              >{`projects/ ${ project.name }`}</button>
            ))}
          </Flyout>
          <button disabled>Rename</button>
          <button
            onClick={this.handleProjectSave}
          >Save</button>
          <button disabled>Save As</button>
          <button disabled>Import</button>
          <button disabled>Export</button>
        </Flyout>
        <div className={`${ styles.projectTitle }`}>{ project.name }</div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  fetchProject: func,
  onSave: func,
  project: PROJECT,
  projects: PROJECTS,
};

export default connect(navProps, navActions)(TopNav);
