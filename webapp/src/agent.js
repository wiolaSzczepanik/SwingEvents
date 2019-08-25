import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.auth(token.login, token.password);
  }
}

let API_ROOT_2 = process.env.REACT_APP_BACKEND || '/apisss';
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
    requests2.get('/auth/user'),
  login: (login, password) => {
    console.log(login);
    console.log(password);
    return superagent.get(`${API_ROOT_2}/auth/user`).auth(login, password).then(response => {
      return {token: {login, password}, user: response.body};
    });
  }
};

export default {
  Auth,
  setToken: _token => { token = _token; },
  requests2,
  API_ROOT_2
};
