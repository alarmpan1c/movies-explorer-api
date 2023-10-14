const allowedCors = [
  'https://varvara.maksimchuk.nomoredomainsrocks.ru',
  'http://varvara.maksimchuk.nomoredomainsrocks.ru',
  'https://api.varvara.maksimchuk.nomoredomainsrocks.ru/users/me',
  'https://api.varvara.maksimchuk.nomoredomainsrocks.ru/cards',
  'https://api.varvara.maksimchuk.nomoredomainsrocks.ru/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://130.193.40.90',
  'http://130.193.40.90',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
