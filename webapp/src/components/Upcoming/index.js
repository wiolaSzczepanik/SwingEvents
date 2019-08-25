import Banner from '../Common/Banner/Banner';
import MainView from './MainView';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const onCityChange = (history) => (city) => {
    if (window.gtag) {
        window.gtag('config', 'UA-146133800-1', {'page_path': '/' + city.key}); // TODO: remove double counting of first page
    }
    history.push(city.key);
    window.localStorage.setItem('selectedCity', JSON.stringify(city))
}

const initialCity = (citySlug) => _ => {
    const citiesByKey = {
        'Kraków': {key: 'Kraków', locative: 'Krakowie'},
        'Poznań': {key: 'Poznań', locative: 'Poznaniu'}
     }

     if (citySlug != undefined) {
        return citiesByKey[citySlug];
     }

     const localStorageCity = window.localStorage.getItem('selectedCity');
     if (localStorageCity) {
        return JSON.parse(localStorageCity);
     }

     return citiesByKey['Kraków'];
}

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Banner onChange={onCityChange(this.props.history)} initialCity={initialCity(this.props.match.params.city)}/>

        <div className="container page">
            <MainView />
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
