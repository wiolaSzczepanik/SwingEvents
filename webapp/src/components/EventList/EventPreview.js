import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import DateRange from './DateRange';
import './EventPreview.css'

const EventPreview = props => {
  const event = props.event;

  return (
    <a href={event.facebookLink} target="_blank">
        <div className="EventPreview row">
            <div className="col-xs-2">
             <img src={event.image} />
            </div>
            <div className="col-xs-8">
                <h1>{event.title}</h1>
                <p>Start: 21:00</p>
                <p>Miejsce: Lost Bar</p>
                <p>Cena: darmowe</p>

               {/* <ul className="tag-list">
                  {
                    event.tagList.map(tag => {
                      return (
                        <li className="tag-default tag-pill tag-outline" key={tag}>
                          {tag}
                        </li>
                      )
                    })
                  }
                </ul> */}
            </div>
            <div className="col-xs-2">
                <DateRange start={event.start} end={event.end} />
            </div>
        </div>
    </a>
  );
}

export default EventPreview;
