import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import ViewTransition from 'COMPONENTS/ViewTransition';
import {
  setShellClass,
} from 'STATE/App/actions';
import styles, {
  animDuration,
} from './styles';

const mapDispatchToProps = {
  setShellClass,
};

class Main extends Component {
  componentDidUpdate(){
    this.props.setShellClass(this.props.location);
  }

  render(){
    const {
      location,
      routes,
    } = this.props;

    return (
      <main>
        <ViewTransition
          className={ `${ styles.viewTransition }` }
          classPrefix="view"
          timeout={ animDuration * 1000 }
          uid={ location.pathname }
        >
          <Switch location={ location }>
            {routes.map((route, ndx) => {
              const View = route.view;

              return (
                <Route
                  key={ ndx }
                  exact={ route.exact }
                  path={ route.path }
                  render={({ match }) => (
                    <View
                      match={ match }
                      { ...route.viewProps }
                    />
                  )}
                />
              );
            })}
          </Switch>
        </ViewTransition>
      </main>
    );
  }
}

Main.propTypes = {
  location: shape({}),
  routes: arrayOf(shape({
    exact: bool,
    url: string,
    view: func,
    viewProps: shape({}),
  })),
  setShellClass: func,
};
Main.defaultProps = {
  routes: [],
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
