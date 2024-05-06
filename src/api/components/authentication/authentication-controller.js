const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');


let loginAttempts = {};
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPT_RESET_TIME = 30 * 60 * 1000;

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    if (loginAttempts[email] && loginAttempts[email].attempts >= MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - loginAttempts[email].lastAttempt;
      if (timeSinceLastAttempt < LOGIN_ATTEMPT_RESET_TIME) {
        throw errorResponder(
          errorTypes.TOO_MANY_ATTEMPTS,
          `Too many login attempts. Please try again after ${Math.ceil((LOGIN_ATTEMPT_RESET_TIME - timeSinceLastAttempt) / 1000)} seconds`
        );
      } else {
        loginAttempts[email] = { attempts: 0, lastAttempt: null };
      }
    }
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      if (!loginAttempts[email]) {
        loginAttempts[email] = { attempts: 1, lastAttempt: Date.now() };
      } else {
        loginAttempts[email].attempts++;
        loginAttempts[email].lastAttempt = Date.now();
      }

      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    loginAttempts[email] = { attempts: 0, lastAttempt: null };
    
    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
