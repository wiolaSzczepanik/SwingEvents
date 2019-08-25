import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  onLogout: () =>
    dispatch({ type: LOGOUT })
});

const LoggedInView = props => {
  if (props.currentUser) {
    return (


      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Główna
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
      </div>
    );
  }

  return null;
};

class Header extends React.Component {

  render() {
  console.log(this.props);
    return (
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg">

          <Link to="/" className="navbar-brand">
            STAFF ONLY
          </Link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

          <LoggedInView currentUser={this.props.currentUser} onLogout={this.props.onLogout} />
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
