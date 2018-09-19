import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Dialog from 'COMPONENTS/Dialog';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
import {
  setProject,
} from 'STATE/actions';
import {
  getDialogError,
  getProject,
  getProjects,
} from 'STATE/selectors';
import store from 'STATE/store';
import { get as getData } from 'UTILS/storage';
import CreateProject from './components/CreateProject';
import styles, { globals as globalStyles } from './styles';

const builderProps = (state) => ({
  dialogError: getDialogError(state),
  project: getProject(state),
  projects: getProjects(state),
});

class Builder extends Component {
  constructor() {
    super();

    this.state = {
      mounted: false,
    };

    globalStyles();
  }

  componentDidMount() {
    if(
      // there are projects to reference
      this.props.projects.length
      // a project hasn't already been specified (in the URL)
      && !this.props.project
    ){
      const project = getData('project');
      
      if(
        // a project was previously chosen
        project 
        // that project exists
        && this.props.projects.includes(project)
      ) store.app.dispatch( setProject(project) );
    }

    this.setState({
      mounted: true,
    });
  }

  render() {
    const {
      dialogError,
      project,
      projects,
    } = this.props;
    const {
      mounted,
    } = this.state;
    const projectText = (project) ? ` / ${ project }` : '';

    return (
      <div className={`${ styles.root }`}>
        { mounted && (
          <SplitPane split="vertical">
            <Pane initialSize="75%">
              <SplitPane split="horizontal">
                <Pane>Builder{ projectText }</Pane>
                <Pane>Preview</Pane>
              </SplitPane>
            </Pane>
            <Pane>
              <div className={`${ styles.rail }`}>
                <nav>
                  <button>Load</button>
                  <button>Save</button>
                  <button>Undo</button>
                  <button>Redo</button>
                </nav>
                <Tabs
                  className={`${ styles.tabs }`}
                  items={[
                    {
                      content: <TilesBrowser />,
                      icon: 'collections',
                      label: 'Tiles',
                    },
                    {
                      content: <Layers />,
                      icon: 'layers',
                      label: 'Layers',
                    },
                  ]}
                />
              </div>
            </Pane>
          </SplitPane>
        )}
        {!projects.length && (
          <Dialog
            error={ dialogError }
            modal opened disableClose
          >
            <CreateProject />
          </Dialog>
        )}
      </div>
    );
  }
}

Builder.propTypes = {
  dialogError: shape({
    data: string,
    status: number,
    statusText: string,
  }),
  project: string,
  projects: arrayOf(string),
};

export default connect(builderProps)(Builder);
