const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'Titulo1',
    genre: 'Drama',
    author: 'Autor1',
    read: false
  },
  {
    title: 'Titulo2',
    genre: 'Historico',
    author: 'Autor2',
    read: false
  },
  {
    title: 'Titulo3',
    genre: 'Policial',
    author: 'Autor3',
    read: false
  },
  {
    title: 'Titulo4',
    genre: 'Romance',
    author: 'Autor4',
    read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (e) {
          debug(e.stack);
        } finally {
          client.close();
        }
      }());
    });
  return adminRouter;
}

module.exports = router;
