import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import moment from "moment";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

let API_ROOT_2 = process.env.REACT_APP_BACKEND || '/apisss';
//'http://localhost:8080'
const requests2 = {
  del: url =>
    superagent.del(`${API_ROOT_2}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT_2}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT_2}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT_2}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
   getAll: () => requests2.get('/events/tags').then(tags =>{ // tags -> http response
        const tagObject = {"tags":tags}
        return tagObject;
   })
};

function testArticles() {
  return {"articles":
          [
            {"title":"Lindy Invasion VI: Second impact","venue":"Kraków", "start": "2019-02-15", "end": "2019-02-17", "tagList":["boogie" +
                " woogie", "lindy hop"]},
            {"title":"Boogie Snow","venue":"Wisła", "start": "2019-03-13", "end": "2019-03-17", "tagList":["boogie woogie"]},
            {"title":"VarCity Bal","venue":"Warszawa", "start": "2019-04-05", "end": "2019-04-07", "tagList":["balboa"]},
          ], "articlesCount":1}
}

function convertEvents(events) {

    function toEvent(event) {
        return {"title": event.titleOfEvent,
            "venue": event.cityOfEvent,
            "start": event.startDate,
            "end": event.endDate,
            "image": event.image,
            "facebookLink": event.facebookLink,
            "tagList": event.tags}
    }

    const newResponse = {"articles": events.map(toEvent), "articlesCount": 3};
    console.log('ERROR', newResponse);
    return newResponse;

}

function isUpcoming(event) {
    return moment(new Date(event.startDate)).isAfter(new Date())
}

function byStartDate(e1, e2) {
    return (e1.startDate > e2.startDate) ? 1 : -1;
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    //requests.get(`/articles?${limit(10, page)}`),
    // return Promise.resolve(testArticles());
    requests2.get('/events').then(convertEvents),
  upcoming: page =>
    requests2.get('/events').then(events => events.filter(isUpcoming).sort(byStartDate)).then(convertEvents),
  past: page =>
    requests2.get('/events/foregone').then(events => events.sort(byStartDate).reverse()).then(convertEvents),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests2.get(`/events?tag=${tag}`).then(convertEvents),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
