const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup')
    .post((req, res) => {
      debug(req.body);
      res.send('hellosdfg');
    });

  authRouter.route('/')
    .get((req, res) => {
      res.send('hello');
    });


  return authRouter;
}

module.exports = router;
