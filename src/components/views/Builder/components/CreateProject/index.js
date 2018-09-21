import React, { Component } from 'react';
import { CREATE_PROJECT } from 'CONSTANTS/routePaths';
import {
  createProject,
} from 'STATE/Builder/actions';
import styles from './styles';

class CreateProject extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const form = ev.currentTarget;
    const { action, method } = form;
    const data = new FormData(form);
    const body = {};

    for(let entry of data.entries()) {
      body[entry[0]] = entry[1];
    }

    createProject({
      body,
      method,
      url: action,
    });
  }

  render() {
    return (
      <form
        className={`${ styles.root }`}
        method="POST"
        action={ CREATE_PROJECT }
        onSubmit={ this.handleSubmit }
      >
        No projects have been detected.
        <br />
        Enter a name for a new project below.
        <div className={`${ styles.inputContainer }`}>
          <input type="text" name="projectName" required />
          <button>Create</button>
        </div>
      </form>
    );
  }
}

export default CreateProject;
