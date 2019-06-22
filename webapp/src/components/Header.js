import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes';

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  onLogout: () =>
    dispatch({ type: LOGOUT })
});

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/ongoing" className="nav-link">
            Aktualne
          </Link>
        </li>

        <li className="nav-item">
            <Link to="/login" className="nav-link">
              Zaloguj
            </Link>
          </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

         <li className="nav-item">
          <Link to="/ongoing" className="nav-link">
            Aktualne
          </Link>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link" onClick={props.onLogout}>
            Wyloguj
          </a> 
        </li>

        <li className="nav-item">
          <span className="nav-link">
            <i className="ion-person"></i>&nbsp;
            {props.currentUser.username}
          </span>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} onLogout={this.props.onLogout} />
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
