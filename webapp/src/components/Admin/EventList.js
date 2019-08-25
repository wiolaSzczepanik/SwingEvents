import EventPreview from '../Common/Event/EventPreview';
import React from 'react';
import './EventList.css'
import { Link } from 'react-router-dom';

const EventList = props => {
  if (!props.events) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.events.length === 0) {
    return (
      <div className="article-preview">
        No upcoming events. Sorry.
      </div>
    );
  }

  return (
    <div className="col-md-12">
        <div class="row">
            <div class="col-md-12">
                <Link to="/staff/editor">
                    <button type="button" class="btn btn-outline-secondary EventList_new-event">Dodaj wydarzenie</button>
                </Link>
            </div>
        </div>
      {
        props.events.map(event => {
          return (
            <div class="row">
               <div class="col-md-10">
                  <EventPreview event={event} />
               </div>
               <div class="col-md-2 EventList_buttons">
                  <Link to={"/staff/editor/" + event.id}>
                      <button type="button" class="btn btn-outline-secondary">Edytuj</button>
                  </Link>
                  <button type="button" class="btn btn-outline-secondary">Usuń</button>
               </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default EventList;
