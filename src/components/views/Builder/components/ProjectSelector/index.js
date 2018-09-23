import React from 'react';
import { arrayOf, string } from 'prop-types';
import CreateProject from '../CreateProject';
import {
  setProject,
} from 'STATE/Builder/actions';
import styles from './styles';

const handleProjectSelect = (ev) => {
  setProject(ev.currentTarget.value);
};

const ProjectSelector = ({
  projects,
}) => {
  return (
    <div className={`${ styles.root }`}>
      <div className={'column'}>
        <h2>Create A New Project</h2>
        <CreateProject />
      </div>
      <div className={`column ${ styles.projectList }`}>
        <h2>Open An Existing Project</h2>
        <div className={'projects'}>
          <div>/Projects</div>
          <ul>
            {projects.map((project, ndx) => (
              <li key={ ndx }>
                <button
                  type="button"
                  onClick={ handleProjectSelect }
                  value={ project }
                >{ project }</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProjectSelector.propTypes = {
  projects: arrayOf(string).isRequired,
};

export default ProjectSelector;
