import React, { Component } from 'react';
// import { arrayOf, string } from 'prop-types';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Dialog from 'COMPONENTS/Dialog';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
import {
  getProjects,
} from 'STATE/selectors';
import store from 'STATE/store';
import CreateProject from './components/CreateProject';
import styles, { globals as globalStyles } from './styles';

class Builder extends Component {
  constructor() {
    super();
    
    const _state = store.app.getState();
    this.state = {
      mounted: false,
      projects: getProjects(_state),
    };

    globalStyles();
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const {
      mounted,
      projects,
    } = this.state;
    // if(!data.length) return null;

    return (
      <div className={`${ styles.root }`}>
        { mounted && (
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
          <Dialog modal opened disableClose>
            <CreateProject />
          </Dialog>
        )}
      </div>
    );
  }
}

// Builder.propTypes = {
//
// };
// Builder.defaultProps = {
//
// };

export default Builder;
