import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../../agent';
import { connect } from 'react-redux';
import DateRange from './DateRange';
import './EventPreview.css'

const EventPreview = props => {
  const event = props.event;
  const info = event.facts;
  const infoIconsAndOrder = [
    {"info": "type", "icon": "fa-calendar"},
    {"info": "style", "icon": "fa-music"},
    {"info": "teachers", "icon": "fa-user-graduate"},
    {"info": "bands", "icon": "fa-drum"},
    {"info": "time", "icon": "fa-clock"},
    {"info": "venue", "icon": "fa-map-marker-alt"},
    {"info": "price", "icon": "fa-dollar-sign"},
  ]

  return (
    <a href={event.link} target="_blank">
        {/* Wide screen */}
        <div className="d-none d-sm-block">
        <div className={'EventPreview row ' + (event.status === 'NOT_CONFIRMED' ? 'EventPreview_not-confirmed' : '')}>
            <div className="col-xs-2">
             <img src={agent.API_ROOT_2 + '/images/' + event.id} />
            </div>
            <div className="col-xs-8">
                <h1>{event.title}</h1>
                <p>
                {
                    infoIconsAndOrder.map(infoRecord => {
                      if(infoRecord.info in info) {
                        const value = info[infoRecord.info];

                        return (
                            <div className="EventPreview_info"> <i className={'fas ' + infoRecord.icon}></i> {value}</div>
                        );
                      } else {
                        return null;
                      }
                    })
                }
                </p>
                <p>
                    {event.description}
                </p>

            </div>
            <div className="col-xs-2">
                <DateRange start={event.startDate} end={event.endDate} />
                {
                   event.status === 'NOT_CONFIRMED'
                        && <div className="EventPreview_not-confirmed-badge badge badge-success" role="alert"> Niepotwierdzone! </div>
                }

            </div>
        </div>
    </div>
    {/* Mobile screen */}
    <div className="d-block d-sm-none">
        <div className="EventPreview row">
        <div className="col-xs-12">
             <DateRange start={event.startDate} end={event.endDate} />
             </div>
            <div className="col-xs-12">
                <h1>{event.title}</h1>
                <p>
                {
                    infoIconsAndOrder.map(infoRecord => {
                      if(infoRecord.info in info) {
                        const value = info[infoRecord.info];

                        return (
                            <div className="EventPreview_info"> <i className={'fas ' + infoRecord.icon}></i> {value}</div>
                        );
                      } else {
                        return null;
                      }
                    })
                }
                </p>

                </div>

                <div className="col-xs-12">
                <p>
                    <img src={agent.API_ROOT_2 + '/images/' + event.id} />
                    {event.description}
                </p>

            </div>

        </div>
        </div>
    </a>
  );
}

export default EventPreview;
