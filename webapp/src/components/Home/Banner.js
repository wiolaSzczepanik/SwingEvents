import React from 'react';
import './Banner.css'
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import { selectCity } from '../../state/upcomingEvents/actions';

const mapStateToProps = state => ({
  selectedCity: state.upcomingEvents.selectedCity,
});

const mapDispatchToProps = dispatch => ({
  cityClick: (city) => dispatch(selectCity(city))
});

class Banner extends React.Component {
  componentWillMount() {
      this.props.cityClick(this.props.selectedCity);
  }

  render() {
      const { appName, token, selectedCity, cityClick } = this.props;

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
                          <a className="dropdown-item" href="#" onClick={() => cityClick(city)} >&nbsp; {city.locative} &nbsp; &nbsp; </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
