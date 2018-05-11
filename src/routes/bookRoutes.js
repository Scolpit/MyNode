const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              title: 'Library',
              nav,
              books
            }
          );
        } catch (e) {
          debug(e.stack);
        } finally {
          client.close();
        }
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              title: 'Library',
              nav,
              book
            }
          );
        } catch (e) {
          debug(e.stack);
        } finally {
          client.close();
        }
      }());
    });

  return bookRouter;
}

module.exports = router;
