import React, { Component } from 'react';
import {
  createProject,
} from 'STATE/actions';
import styles from './styles';

class CreateProject extends Component {
  constructor() {
    super();
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(ev) {
    ev.preventDefault();
    
    const { action, method } = ev.currentTarget;
    
    // TODO - wire this up
    createProject({
      method,
      url: action,
    });
  }
  
  render() {
    // TODO - expose API endpoints via the store or window prop
    
    return (
      <form
        className={`${ styles.root }`}
        method="POST"
        action="/api/project/create"
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