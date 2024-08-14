const { validationAuthorization, validationRegistration } = require('../middleware/users-validation');
const { registerUser, authUser, addCoin, logout, refresh, activateUser } = require('../controllers/controllers');
const { middleware } = require('../middleware/auth-middleware');

function router() {
  return {
    registration: {
      method: 'POST',
      url: 'registration',
      handler: registerUser,
      schema: {
        body: {
          type: 'object',
          required: ['email', 'login', 'password'],
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            user: { type: 'object' }
          }
        },
        preHandler: validationRegistration
      }
    },
    authorization: {
      method: 'POST',
      url: 'authorization',
      handler: authUser,
      schema: {
        body: {
          type: 'object',
          required: ['login', 'password'],
          properties: {
            login: { type: 'string' },
            password: { type: 'string' }
          }
        },
        preHandler: validationAuthorization
      }
    },
    takeCoin: {
      method: 'POST',
      url: 'user/coins/add',
      handler: addCoin,
      beforeHandler: middleware,
      schema: {
        body: {
          type: 'object',
          required: ['login', 'coin'],
          properties: {
            login: { type: 'string' },
            coin: { type: 'number' }
          }
        },
      }
    },
    logout: {
      method: 'POST',
      url: 'logout',
      handler: logout,
    },
    activate: {
      method: 'GET',
      url: 'activate/:link',
      handler: activateUser,
    },
    refresh: {
      method: 'GET',
      url: 'auth/refresh',
      handler: refresh,
    }
  };
}

module.exports = { router };

