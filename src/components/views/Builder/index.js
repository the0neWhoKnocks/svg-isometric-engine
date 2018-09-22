import React, { Component, Fragment } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
import {
  setProject,
} from 'STATE/Builder/actions';
import {
  getProject,
  getProjects,
} from 'STATE/Builder/selectors';
import {
  openModal,
} from 'STATE/Dialog/actions';
import { get as getData } from 'UTILS/storage';
import CreateProject from './components/CreateProject';
import TopNav from './components/TopNav';
import styles, { globals as globalStyles } from './styles';

const builderProps = (state) => ({
  project: getProject(state),
  projects: getProjects(state),
});

class Builder extends Component {
  constructor(props) {
    super();

    this.state = {
      mounted: false,
    };

    if( !props.projects.length ){
      openModal({
        children: <CreateProject />,
        disableClose: true,
      });
    }

    globalStyles();
  }

  componentDidMount() {
    const {
      project,
      projects,
    } = this.props;

    if(
      // there are projects to reference
      projects.length
      // a project hasn't already been specified (in the URL)
      && !project
    ){
      const _project = getData('project');

      if(
        // a project was previously chosen
        _project
        // that project exists
        && projects.includes(_project)
      ) setProject(_project);
    }

    this.setState({
      mounted: true,
    });
  }

  render() {
    const {
      projects,
    } = this.props;
    const {
      mounted,
    } = this.state;

    if( !projects.length ) return null;

    return (
      <div className={`${ styles.root }`}>
        { mounted && (
          <Fragment>
            <TopNav />
            <SplitPane split="vertical">
              <Pane initialSize="75%">
                <SplitPane split="horizontal">
                  <Pane>Builder</Pane>
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
                        icon: 'photo_library',
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
          </Fragment>
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
