import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

class UserEvents extends React.Component {
  constructor() {
    super();
  }

  componentWillUnmount() {

  }

  render() {
    const event = { }
    return (
      <div className="ongoingevent-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{event.name}</h1>

            </div>

          </div>
          <div>
          {
              event.images.map(function(image, idx) {
                  return (
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <img src={image} width="100%" /><br />
                        </div>
                    </div>
                    )
              })
          }
        </div>
        </div>
      </div>
    );
  }
}

export default UserEvents;
