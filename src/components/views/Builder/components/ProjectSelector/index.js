import React, { Component } from 'react';
import {
  PROJECTS,
} from 'CONSTANTS/propTypes';
import {
  fetchProject,
} from 'STATE/Builder/actions';
import CreateProject from '../CreateProject';
import styles from './styles';

class ProjectSelector extends Component {
  constructor() {
    super();

    this.handleProjectSelect = this.handleProjectSelect.bind(this);
  }

  handleProjectSelect(ev) {
    const {
      projects,
    } = this.props;
    const projectNdx = ev.currentTarget.value;

    fetchProject( projects[projectNdx].uid );
  }

  render() {
    const {
      projects,
    } = this.props;
    let projectsListClass = styles.projectList;

    if(!projects.length) projectsListClass += ' no--projects';

    return (
      <div className={`${ styles.root }`}>
        <div className={'column'}>
          <h2 className={`${ styles.columnTitle }`}>Create A New Project</h2>
          <CreateProject />
        </div>
        <div className={`column ${ projectsListClass }`}>
          <h2 className={`${ styles.columnTitle }`}>Open An Existing Project</h2>
          <div className={'projects'}>
            <div>/Projects</div>
            <ul>
              {projects.map((project, ndx) => (
                <li key={ ndx }>
                  <button
                    type="button"
                    onClick={ this.handleProjectSelect }
                    value={ ndx }
                  >{ project.name }</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProjectSelector.propTypes = {
  projects: PROJECTS,
};

export default ProjectSelector;
