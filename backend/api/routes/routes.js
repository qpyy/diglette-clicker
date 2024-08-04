const { validationAuthorization, validationRegistration } = require('../middleware/users-validation');
const { registerUser, authUser, addCoin } = require('../controllers/controllers');

function router() {
  return {
    registration: {
      method: 'POST',
      url: 'registration',
      handler: registerUser,
      schema: {
        body: {
          type: 'object',
          required: ['login'],
          properties: {
            login: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
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
          required: ['login'],
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
      url: 'coin',
      handler: addCoin,
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
    }
  };
}

module.exports = { router };

