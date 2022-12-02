const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const comparePasswords = (password, hash) => bcrypt.compare(password, hash);

const hashPassword = (password) => bcrypt.hash(password, 5);

const createJWT = (trainer) => {
  const token = jwt.sign(
    {
      id: trainer.id,
      username: trainer.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  comparePasswords,
  hashPassword,
  createJWT,
};
