import EventPreview from '../Common/Event/EventPreview';
import { connect } from 'react-redux';
import React from 'react';
import './EventList.css'
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { refreshManagedEvents } from '../../state/managedEvents/actions';

const removeEvent = (id, props) => async _ => {
  await agent.requests2.del('/admin/events/' + id)
  props.refreshEvents();
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  refreshEvents: () => dispatch(refreshManagedEvents())
});

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
               <div class="col-md-2">
                  <Link to={"/staff/editor/" + event.id}>
                      <button type="button" class="btn btn-outline-secondary EventList_button">Edytuj</button>
                  </Link>
                  <button type="button" class="btn btn-outline-secondary EventList_button" data-toggle="modal" data-target={'#delete-event-' + event.id}>Usuń</button>
                    {/* Modal */}
                  <div class="modal fade" id={'delete-event-' + event.id} tabindex="-1" role="dialog" aria-labelledby={'label-delete-event-' + event.id} aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id={'label-delete-event-' + event.id}>Potwierdzenie</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Czy na pewno chcesz usunąć wydarzenie {event.title}?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Anuluj</button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={removeEvent(event.id, props)}>Usuń</button>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);

