import React from 'react';
import './Banner.css'
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import { selectCity } from '../../state/upcomingEvents/actions';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  selectedCity: state.upcomingEvents.selectedCity,
});

const mapDispatchToProps = dispatch => ({
  cityClick: (city, history) => {
    if (window.gtag) {
        window.gtag('config', 'UA-146133800-1', {'page_path': '/' + city.key}); // TODO: remove double counting of first page
    }
    history.push(city.key);
    dispatch(selectCity(city))
  }
});

class Banner extends React.Component {
  componentWillMount() {
     const citiesByKey = {
        'Kraków': {key: 'Kraków', locative: 'Krakowie'},
        'Poznań': {key: 'Poznań', locative: 'Poznaniu'}
     }

     let city = this.props.selectedCity;
     if (this.props.citySlug != undefined && this.props.citySlug !== this.props.selectedCity.key) {
         city = citiesByKey[this.props.citySlug];       // TODO: move this to redux
     }

     this.props.cityClick(city, this.props.history);
  }

  render() {
      const { appName, token, selectedCity, cityClick, citySlug } = this.props;

      const cities = [
        {key: 'Kraków', locative: 'Krakowie'},
        {key: 'Poznań', locative: 'Poznaniu'}
      ]

      if (token) {
        return null;
      }
      return (
        <div className="Banner">
          <div className="container">
            <h1>
              kiedy tańczę?
            </h1>
            <h1>w</h1>
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                &nbsp; {selectedCity.locative} &nbsp;
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                    cities.map(city => {
                        return (
                          <a className="dropdown-item" href="#" onClick={() => cityClick(city, this.props.history)} >&nbsp; {city.locative} &nbsp; &nbsp; </a>
                        );
                      })
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Banner));
