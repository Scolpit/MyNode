const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

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

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Library',
      nav: [{ title: 'Books', link: '/books' }, { title: 'Authors', link: '/authors' }]
    }
  );
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
