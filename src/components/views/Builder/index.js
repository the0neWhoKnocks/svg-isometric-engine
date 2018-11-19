import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
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

const TILE_WIDTH_MIN = 5;
const TILE_WIDTH_MAX = 300;

class Builder extends Component {
  constructor(props) {
    super();

    this.els = {};
    this.state = {
      builderCanvasHeight: 0,
      builderCanvasWidth: 0,
      horzPaneSize: '50%',
      mapHeight: props.mapHeight,
      mapWidth: props.mapWidth,
      mounted: false,
      tileWidth: props.tileWidth,
      tileWidthVal: props.tileWidth,
      vertPaneSize: '75%',
    };

    globalStyles();
    this.handleResize = this.handleResize.bind(this);
    this.handleHorizontalResize = this.handleHorizontalResize.bind(this);
    this.handleMapSizeChange = this.handleMapSizeChange.bind(this);
    this.handleTileWidthChange = this.handleTileWidthChange.bind(this);
    this.handleVerticalResize = this.handleVerticalResize.bind(this);
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
    }, () => {
      if(project){
        this.setState({
          ...this.getBuilderPaneDimensions(),
        });
      }
    });
    this.mounted = true;

    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if(
      !prevProps.project && this.props.project
      || prevProps.project
      && prevProps.project.uid !== this.props.project.uid
    ){
      this.setState({
        ...this.getBuilderPaneDimensions(),
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Ensures the map's canvas fits in the pane
   */
  getBuilderPaneDimensions() {
    const pane = findDOMNode(this.els.builderPane); // eslint-disable-line
    return {
      builderCanvasHeight: pane.clientHeight,
      builderCanvasWidth: pane.clientWidth,
    };
  }

  handleMapSizeChange(ev) {
    const el = ev.currentTarget;
    const state = (el.name === 'mapWidth')
      ? { mapWidth: +el.value }
      : { mapHeight: +el.value };

    this.setState(state);
  }

  handleHorizontalResize(size) {
    this.handleResize({
      size,
      sizeType: 'horz',
    });
  }

  handleVerticalResize(size) {
    this.handleResize({
      size,
      sizeType: 'vert',
    });
  }

  handleResize(ev = {}) {
    if( this.mounted ){
      if( this.resizeTimeout ) clearTimeout(this.resizeTimeout);
      const _self = this;

      this.resizeTimeout = setTimeout(() => {
        const state = {};

        // update pane state first
        if(ev.sizeType){
          // TODO - possibly record pane sizes so page reloads persist views
          state[`${ ev.sizeType }PaneSize`] = ev.size[0];
          _self.setState(state, _self.handleResize);
        }
        // update child els after
        else{
          _self.setState({
            ...this.getBuilderPaneDimensions(),
          });
        }
      }, 50);
    }
  }

  handleTileWidthChange(ev) {
    const val = +ev.currentTarget.value;
    const state = { tileWidthVal: val };

    this.setState(state, () => {
      if( this.inputTimeout ) clearTimeout(this.inputTimeout);

      this.inputTimeout = setTimeout(() => {
        if( val < TILE_WIDTH_MIN ) state.tileWidthVal = TILE_WIDTH_MIN;
        else if( val > TILE_WIDTH_MAX ) state.tileWidthVal = TILE_WIDTH_MAX;
        state.tileWidth = state.tileWidthVal;

        this.setState(state);
      }, 300);
    });
  }

  render() {
    const {
      project,
      projects,
    } = this.props;
    const {
      builderCanvasWidth,
      builderCanvasHeight,
      horzPaneSize,
      mapHeight,
      mapWidth,
      mounted,
      tileWidth,
      tileWidthVal,
      vertPaneSize,
    } = this.state;

    return (
      <div className={`${ styles.root }`}>
        {(mounted && (!projects || !project)) && (
          <ProjectSelector projects={ projects } />
        )}
        {(mounted && project) && (
          <Fragment>
            <TopNav />
            <SplitPane
              split="vertical"
              onChange={this.handleVerticalResize}
            >
              <Pane initialSize={vertPaneSize}>
                <SplitPane
                  split="horizontal"
                  onChange={this.handleHorizontalResize}
                >
                  <Pane
                    ref={(ref) => this.els.builderPane = ref}
                    initialSize={horzPaneSize}
                    className="map-pane"
                  >
                    <div className={`map-pane__label ${ styles.mapPaneLabel }`}>
                      Builder
                    </div>
                    <MapRenderer
                      canvasWidth={builderCanvasWidth}
                      canvasHeight={builderCanvasHeight}
                      mapWidth={mapWidth}
                      mapHeight={mapHeight}
                      tileWidth={tileWidth}
                    />
                    <nav className={`builder-nav ${ styles.builderNav }`}>
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
                      <label>
                        Tile Width:
                        <input
                          type="number"
                          value={tileWidthVal}
                          name="tileWidth"
                          onChange={this.handleTileWidthChange}
                          min={TILE_WIDTH_MIN}
                          max={TILE_WIDTH_MAX}
                        />
                      </label>
                    </nav>
                  </Pane>
                  <Pane className="map-pane">
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
  tileWidth: 128,
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
  tileWidth: number,
};

export default connect(builderProps)(Builder);
