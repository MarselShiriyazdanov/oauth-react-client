module.exports = {
  target: 'http://localhost:5000',
  apiTarget: 'http://localhost:5000/v1',
  apiPath: '/v1',
  storageKey: 'user_session',
  session: {
    tokenKey: 'authentication_token',
    emailKey: 'email'
  }
};
