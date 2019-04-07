import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

class OngoingEvent extends React.Component {
  constructor() {
    super();
  }

  componentWillUnmount() {

  }

  render() {
    const event = {
//        'name': 'Lindy Invasion VI: Second impact',
//        'images': [
//            'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/52144364_2036573383105501_6334918195702398976_o.jpg?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=e6010500c029927cf1cb7ec873a8446e&oe=5CE9D234',
//            'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/52598759_2035292783233561_1221763795932676096_o.png?_nc_cat=109&_nc_ht=scontent-waw1-1.xx&oh=45bae810324151c7bc9d7de16a7078b2&oe=5CF3200C'
//        ]
    }
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

export default OngoingEvent;
