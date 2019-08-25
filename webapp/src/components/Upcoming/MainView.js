import EventList from './EventList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { fetchUpcomingEventsIfNeeded } from '../../state/upcomingEvents/actions';
import { withRouter, Link } from "react-router-dom";

function selectedEvents(events, city) {
    if (!events || !city) {
        return null
    }
    return events[city.key];
}

const mapStateToProps = state => ({
  ...state.eventList,
  events: selectedEvents(state.upcomingEvents.events, state.eventFilter.city),
  filter: state.eventFilter,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (filter) => dispatch(fetchUpcomingEventsIfNeeded(filter))
});

class MainView extends React.Component {
  componentWillMount() {
    this.props.fetchEvents(this.props.filter);
  }
  componentDidUpdate(prevProps) {
    this.props.fetchEvents(this.props.filter);
  }

  render() {
    return (
    <div className="col-md-12">
      <EventList
        events={this.props.events}
        loading={this.props.loading}/>
    </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainView));
