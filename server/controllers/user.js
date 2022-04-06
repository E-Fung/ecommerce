const User = require('../db').User;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  getUser(req, res) {
    //Good
    if (req.user) {
      return res.json(req.user);
    } else {
      return res.json({});
    }
  },

  register(req, res, next) {
    //Good
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ error: 'Name, password, and email required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    return User.create(req.body)
      .then((user) => {
        const token = jwt.sign({ userId: user.dataValues.userId }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ ...user.dataValues, token });
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
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    return User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          console.log({ error: `No user found for email: ${email}` });
          res.status(401).json({ error: 'Wrong email and/or password' });
        } else if (!user.correctPassword(password)) {
          console.log({ error: 'Wrong email and/or password' });
          res.status(401).json({ error: 'Wrong email and/or password' });
        }

        const token = jwt.sign({ userId: user.dataValues.userId }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ ...user.dataValues, token });
      })
      .catch((error) => {
        next(error);
      });
  },

  logout(req, res, next) {
    res.sendStatus(204);
  },

  alterPhoto(req, res) {
    return User.findOne({
      where: {
        userId: req.user.userId,
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
