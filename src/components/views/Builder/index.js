import React, { Component, Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
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
import { get as getData } from 'UTILS/storage';
import MapRenderer from './components/MapRenderer';
import ProjectSelector from './components/ProjectSelector';
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
      mapHeight: props.mapHeight,
      mapWidth: props.mapWidth,
      mounted: false,
    };

    globalStyles();
    this.handleMapSizeChange = this.handleMapSizeChange.bind(this);
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
      ) fetchProject(_project.uid);
    }

    this.setState({
      mounted: true,
    });
  }

  handleMapSizeChange(ev) {
    const el = ev.currentTarget;
    const state = (el.name === 'mapWidth')
      ? { mapWidth: +el.value }
      : { mapHeight: +el.value };

    this.setState(state);
  }

  render() {
    const {
      project,
      projects,
    } = this.props;
    const {
      mapHeight,
      mapWidth,
      mounted,
    } = this.state;

    return (
      <div className={`${ styles.root }`}>
        {(mounted && (!projects || !project)) && (
          <ProjectSelector projects={ projects } />
        )}
        {(mounted && project) && (
          <Fragment>
            <TopNav />
            <SplitPane split="vertical">
              <Pane initialSize="75%">
                <SplitPane split="horizontal">
                  <Pane className={`map-pane ${ styles.mapPane }`}>
                    <div className={`map-pane__label ${ styles.mapPaneLabel }`}>
                      Builder
                    </div>
                    <MapRenderer
                      mapWidth={mapWidth}
                      mapHeight={mapHeight}
                    />
                    <nav className={`${ styles.builderNav }`}>
                      <label>
                        Map Width:
                        <input
                          type="number"
                          value={mapWidth}
                          name="mapWidth"
                          onChange={this.handleMapSizeChange}
                        />
                      </label>
                      <label>
                        Map Height:
                        <input
                          type="number"
                          value={mapHeight}
                          name="mapHeight"
                          onChange={this.handleMapSizeChange}
                        />
                      </label>
                    </nav>
                  </Pane>
                  <Pane className={`map-pane ${ styles.mapPane }`}>
                    <div className={`map-pane__label ${ styles.mapPaneLabel }`}>
                      Preview
                    </div>
                  </Pane>
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

Builder.defaultProps = {
  mapHeight: 4,
  mapWidth: 4,
};

Builder.propTypes = {
  dialogError: shape({
    data: string,
    status: number,
    statusText: string,
  }),
  mapHeight: number,
  mapWidth: number,
  project: PROJECT,
  projects: PROJECTS,
  tileHeight: number,
  tileWidth: number,
};

export default connect(builderProps)(Builder);
