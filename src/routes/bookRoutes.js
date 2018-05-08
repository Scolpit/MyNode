const express = require('express');
const bookRouter = express.Router();

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
      'books',
      {
        title: 'Library',
        nav: [{ title: 'Books', link: '/books' }, { title: 'Authors', link: '/authors' }],
        books
      }
    );
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.render('book');
  });

module.exports = bookRouter;
