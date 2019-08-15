import EventPreview from './EventPreview';
import ListPagination from '../ListPagination';
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

      <ListPagination
        pager={props.pager}
        articlesCount={props.eventsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default EventList;
