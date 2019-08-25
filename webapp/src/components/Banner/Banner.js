import React from 'react';
import './Banner.css'
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import { selectCity } from '../../state/eventFilter/actions';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  selectedCity: state.eventFilter.city,
});

const mapDispatchToProps = dispatch => ({
  cityClick: (city, onChange) => {
    onChange(city);
    dispatch(selectCity(city))
  }
});

class Banner extends React.Component {
  componentWillMount() {
     this.props.cityClick(this.props.initialCity(), this.props.onChange);
  }

  render() {
      const { onChange, selectedCity, cityClick } = this.props;

      const cities = [
        {key: 'Kraków', locative: 'Krakowie'},
        {key: 'Poznań', locative: 'Poznaniu'}
      ]

      if (!this.props.selectedCity) {
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
                          <a className="dropdown-item" href="#" onClick={() => cityClick(city, onChange)} >&nbsp; {city.locative} &nbsp; &nbsp; </a>
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
