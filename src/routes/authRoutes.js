const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router() {
  authRouter.route('/signup')
    .post((req, res) => {
      //  Create user
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
