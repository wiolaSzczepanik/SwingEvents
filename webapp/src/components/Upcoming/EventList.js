import EventPreview from '../Common/Event/EventPreview';
import React from 'react';

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
    <div>
      {
        props.events.map(event => {
          return (
            <EventPreview event={event} />
          );
        })
      }
    </div>
  );
};

export default EventList;
