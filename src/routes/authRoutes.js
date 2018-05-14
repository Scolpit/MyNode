const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function AddUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly');

          const db = client.db(dbName);

          const col = await db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);

          debug(results);

          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (e) {
          debug(e.stack);
        } finally {
          client.close();
        }
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
