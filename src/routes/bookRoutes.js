const express = require('express');

const bookRouter = express.Router();

function router(nav) {
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

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          title: 'Library',
          nav,
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          title: 'Library',
          nav,
          book: books[id]
        }
      );
    });

  return bookRouter;
}


module.exports = router;
