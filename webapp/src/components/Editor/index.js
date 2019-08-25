import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import EventPreview from '../EventList/EventPreview';

import { Form, Field } from 'react-final-form'

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  if (values.id) {

  } else {
    const request = { ...values }
    request.tags = [];
    request.titleOfEvent = values.title;
    request.cityOfEvent = values.city;
    request.facebookLink = values.link;

    await agent.requests2.post('/admin/events', request)
    window.alert("Artykuł został dodany")
  }


  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const fetchEvent = async id => {
  if (!id) {
    return {}
  }

  await sleep(300)

  return {
    "id": "11",
    "startDate": "2019-09-19",
    "endDate": "2019-09-22",
    "title": "Krak The Shag, Hola Balboa",
    "city": "Kraków",
    "link": "https://www.facebook.com/events/2141970232790590/",
    "image": null,
    "description": "We would like to happily announce that date of Krak The Shag 2019:) It will be 4th edition of this event! <br />Let's gather together to enjoy Shag and Balboa dancing between the 19-22 September 2019!! Three days of workshops, 4 nights of parties :D, tons of hours full of joy, fun, conversations, craziness and dance of course!",
    "status": "CONFIRMED",
    "facts": {
        "type": "Festiwal",
        "style": "Collegiate Shag",
        "bands": "Professor Cunningham and his Old School"
    }
  }
}

class Editor extends React.Component {

  async componentDidMount() {
      this.setState({ loading: true })
      const data = await fetchEvent(this.props.match.params.id)
      this.setState({ loading: false, data })
  }

  render() {
    return (
         <div className="editor-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
    <Form
          onSubmit={onSubmit}
          initialValues={this.state && this.state.data}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                  <label>Tytuł wydarzenia</label>
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Tytuł wydarzenia"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-group">
                    <label>Miasto</label>
                    <Field name="city" component="select" className="form-control">
                       <option />
                       <option value="Kraków">Kraków</option>
                       <option value="Poznań">Poznań</option>
                    </Field>
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <Field name="status" component="select" className="form-control">
                       <option />
                       <option value="CONFIRMED">Potwierdzone</option>
                       <option value="NOT_CONFIRMED">Niepotwierdzone</option>
                    </Field>
                </div>

                 <div className="form-group">
                    <label>Rodzaj wydarzenia</label>
                    <Field name="facts.type" component="select" className="form-control">
                       <option />
                       <option value="Festiwal">Festiwal</option>
                       <option value="Warsztaty">Warsztaty</option>
                       <option value="Potańcówka">Potańcówka</option>
                    </Field>
                </div>

                <div className="form-group">
                  <label>Rodzaj tańca / muzyki</label>
                  <Field name="facts.style" component="input" type="text"
                    placeholder="Styl tańca/muzyki" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Np. Lindy Hop, Collegiate Shag, etc.</small>
                </div>

                <div className="form-group">
                  <label>Link do wydarzenia</label>
                  <Field name="link" component="input" type="text"
                    placeholder="Link do wydarzenia (np do FB)" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Link do Facebooka lub link do strony wydarzenia</small>
                </div>

                <div className="form-group">
                   <label>Link do zdjęcia</label>
                   <Field name="image" component="input" type="text" placeholder="Link do zdjęcia"
                           className="form-control form-control-lg" />
                   <small class="form-text text-muted">Zdjęcie musi być dostępne w internecie.
                   Jeśli wydarzenie jest już na FB, wystarczy skopiować link do zdjęcia wyświetlanego przez FB</small>
                </div>

                <div className="form-group">
                  <label>Data rozpoczęcia</label>
                  <Field name="startDate" component="input" type="date" placeholder="Data rozpoczęcia"
                         className="form-control form-control-lg" />
                </div>

                <div className="form-group">
                  <label>Data zakończenia</label>
                  <Field name="endDate" component="input" type="date" placeholder="Data zakończenia"
                         className="form-control form-control-lg" />
                </div>

                <div className="form-group">
                  <label>Opis</label>
                  <Field name="description" component="textarea" rows="5"
                    placeholder="Opis" className="form-control"
                  />
                </div>

                <h2>Podgląd</h2>
                  <div>
                    {values && values.facts && <EventPreview event={values} />}
                  </div>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                  disabled={submitting || pristine}>
                  Publish event
                </button>
                <button
                  className="btn btn-lg pull-xs-right btn-secondary"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}>
                  Reset
                </button>

              {/* add validation, do not show until valid */}


              <pre>{JSON.stringify(values, 0, 2)}</pre>

            </form>
          )}
        />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
