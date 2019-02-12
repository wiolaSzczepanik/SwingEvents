import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

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
  // getAll: () => requests.get('/tags')
  getAll: () => Promise.resolve(
      {"tags":["lindy hop", "balboa", "collegiate shag", "blues", "boogie woogie", "solo"]}
  )
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

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    //requests.get(`/articles?${limit(10, page)}`),
    // return Promise.resolve(testArticles());
    requests2.get('/events').then(events => {
      
      function toEvent(event) {
         return {"title": event.titleOfEvent,
                "venue": event.titleOfEvent, 
                "start": event.date, 
                "end": event.date, 
                "tagList": ["boogie woogie", "lindy hop"]}
      }

      const newResponse = {"articles": events.map(toEvent), "articlesCount": 3};
      console.log('ERROR', newResponse);
      return newResponse;
    }),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
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