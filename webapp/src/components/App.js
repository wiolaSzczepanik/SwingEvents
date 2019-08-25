import agent from '../agent';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../state/auth/actions';
import { Route, Switch } from 'react-router-dom';
import Editor from '../components/Admin/Editor/';
import Home from '../components/Upcoming';
import Admin from '../components/Admin';
import Login from '../components/Admin/Login/Login';
import { store } from '../state/store';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {
    appLoaded: state.auth.appLoaded,
    appName: state.auth.appName,
    currentUser: state.auth.currentUser,
    redirectTo: state.auth.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(JSON.parse(token));
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} startTab="all"/> } />
                <Route path="/login" component={Login} />
                <Route path="/staff/editor/:id" component={Editor} />
                <Route path="/staff/editor" component={Editor} />
                <Route path="/staff" render={(props) => <Admin {...props} />} />
                <Route exact path="/:city" render={(props) => <Home {...props} startTab="all"/> } />
            </Switch>
        </div>
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
