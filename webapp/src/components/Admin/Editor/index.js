import React from 'react';
import agent from '../../../agent';
import { connect } from 'react-redux';
import EventPreview from '../../Common/Event/EventPreview';

import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const toRequest = values => {
    const request = { ...values }
    request.tags = [];
    request.titleOfEvent = values.title;
    request.cityOfEvent = values.city;
    request.facebookLink = values.link;
    return request;
}

const onSubmit = async values => {
  if (values.id) {
    await agent.requests2.put('/admin/events/' + values.id, toRequest(values))
    window.alert("Artykuł został zmieniony")

  } else {
    await agent.requests2.post('/admin/events', toRequest(values))
    window.alert("Artykuł został dodany")
  }
}

const fetchEvent = async id => {
  if (!id) {
    return {}
  }

  return await agent.requests2.get('/admin/events/' + id)
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

                <div className="form-group">
                  <label>Czas</label>
                  <Field name="facts.time" component="input" type="text"
                    placeholder="czas" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Np. 19:00-22:00, tylko jednodniowe wydarzenia</small>
                </div>

                <div className="form-group">
                  <label>Zespół / DJ</label>
                  <Field name="facts.bands" component="input" type="text"
                    placeholder="Zespół albo DJ?" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Przykłady: Schwings Band, DJ Monika, DJ (kiedy nie wiadomo kto gra)</small>
                </div>
                <div className="form-group">
                  <label>Nauczyciele</label>
                  <Field name="facts.teachers" component="input" type="text"
                    placeholder="Nauczyciele" className="form-control form-control-lg"
                  />
                </div>
                <div className="form-group">
                  <label>Miejsce</label>
                  <Field name="facts.venue" component="input" type="text"
                    placeholder="Adres" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Miejsce (adres) potańcówki</small>
                </div>

                <div className="form-group">
                  <label>Cena wejściówki</label>
                  <Field name="facts.price" component="input" type="text"
                    placeholder="Cena" className="form-control form-control-lg"
                  />
                  <small class="form-text text-muted">Np.: bezpłatne, 0 + bar, 15 PLN</small>
                </div>

                <h2>Podgląd</h2>
                  <div>
                    {values && values.facts && <EventPreview event={values} />}
                  </div>

                <button
                  className="btn btn-lg float-right btn-primary"
                  type="submit"
                  disabled={submitting || pristine}>
                  Zapisz
                </button>
                <button
                  className="btn btn-lg float-right btn-secondary mr-2"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}>
                  Reset
                </button>
                <Link to="/staff">
               <button
                  className="btn btn-lg float-right btn-secondary mr-2"
                  type="button">
                  Powrót
                </button>
                </Link>

              {/* add validation, do not show until valid */}

                {/*
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                */}

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
