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
        className={`create-project ${ styles.root }`}
        method="POST"
        action={ CREATE_PROJECT }
        onSubmit={ this.handleSubmit }
      >
        Enter a name for a new project below.
        <div className={`create-project__input-container ${ styles.inputContainer }`}>
          <input
            type="text"
            name="projectName"
            autoFocus
            required
            ref={(ref) => { this.inputRef = ref; }}
          />
          <button>Create</button>
        </div>
      </form>
    );
  }
}

export default CreateProject;
