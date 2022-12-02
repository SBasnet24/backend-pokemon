const API_ERROR_MSG = Object.freeze({
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  UNAUTHORIZED: 'You are not authorized to access',
  NO_TOKEN: 'No token provided',
  EXISTS: 'ALREADY_EXISTS',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_INVALID: 'Token is invalid',
  INVALID_METHOD: 'Invalid method',
  TRAINER_ALREADY_EXISTS: 'Trainer already exists with this username',
  POKEMON_ALREADY_EXISTS: 'You have already registered the pokemon with this username',
  LEAGUE_ALREADY_EXISTS: 'League with same title already exists',
  NO_LEAGUE: 'No league exists with that id',
  ALREDY_PARTICIPATED: 'You hava already participated for this league',
  SLOTS_ALREADY_FILLED: 'You have already filled in slots with this league',
  TRAINER_NOT_VALID: 'Invalid trainer',
});

module.exports = API_ERROR_MSG;
