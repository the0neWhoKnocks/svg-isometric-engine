import React, { Component } from 'react';
// import { arrayOf, string } from 'prop-types';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Layers from 'COMPONENTS/Layers';
import Tabs from 'COMPONENTS/Tabs';
import TilesBrowser from 'COMPONENTS/TilesBrowser';
import styles, { globals as globalStyles } from './styles';

class Builder extends Component {
  constructor() {
    super();

    this.state = {
      mounted: false,
    };

    globalStyles();
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const { mounted } = this.state;
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
              <nav>
                <button>Load</button>
                <button>Save</button>
                <button>Undo</button>
                <button>Redo</button>
              </nav>
              <Tabs items={[
                {
                  label: 'Tiles',
                  content: <TilesBrowser />,
                },
                {
                  label: 'Layers',
                  content: <Layers />,
                },
              ]}>
              </Tabs>
            </Pane>
          </SplitPane>
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
