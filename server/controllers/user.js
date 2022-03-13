const User = require('../db').User;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  register(req, res, next) {
    return User.create(req.body)
      .then((user) => {
        const token = jwt.sign({ id: user.dataValues.email }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ user, token });
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(401).json({ error: 'User already exists' });
        } else if (error.name === 'SequelizeValidationError') {
          return res.status(401).json({ error: 'Validation error' });
        } else next(error);
      });
  },
  login(req, res, next) {
    return User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        const token = jwt.sign({ id: user.dataValues.email }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ user, token });
      })
      .catch((error) => {
        next(error);
      });
  },
  alterPhoto(req, res) {
    return User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        user.photoUrl = req.body.photoUrl;
        user.save();
        res.status(201).send(user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
};

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
