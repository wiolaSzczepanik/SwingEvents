import React from 'react';
import Banner from '../Common/Banner/Banner';
import AdminView from './AdminView';
import Header from './Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

const mapStateToProps = state => ({
  ...state.home,
  token: state.auth.token,
  selectedCity: state.eventFilter.city
});

const mapDispatchToProps = dispatch => ({
});

const onCityChange = (city) => {
}

const initialCity = props => _ => {
     if (props.selectedCity) {
        return props.selectedCity;
     }

     return {key: 'Kraków', locative: 'Krakowie'}
}

class Home extends React.Component {
  render() {
    if (!this.props.token) {
        return (<Redirect to="/login" />);
    }

    return (
      <div className="home-page">
        <Header />
        <Banner onChange={onCityChange} initialCity={initialCity(this.props)} />

        <div className="container page">
            <AdminView />
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
