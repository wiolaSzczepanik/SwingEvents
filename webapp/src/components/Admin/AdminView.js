import EventList from './EventList';
import React from 'react';
import { connect } from 'react-redux';
import { fetchManagedEventsIfNeeded } from '../../state/managedEvents/actions';
import { Link, withRouter } from 'react-router-dom';

function selectedEvents(events, city) {
    if (!events || !city) {
        return null
    }
    return events[city.key];
}

const mapStateToProps = state => ({
  ...state.eventList,
  events: selectedEvents(state.managedEvents.events, state.eventFilter.city),
  token: state.auth.token,
  filter: state.eventFilter,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (filter) => dispatch(fetchManagedEventsIfNeeded(filter))
});

class AdminView extends React.Component {
  componentWillMount() {
    this.props.fetchEvents(this.props.filter);
  }
  componentDidUpdate(prevProps) {
    this.props.fetchEvents(this.props.filter);
  }

  render() {
      return (
        <EventList
            events={this.props.events}
            loading={this.props.loading} />
      );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminView));
