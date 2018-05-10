const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const nav = [{ title: 'Book', link: '/books' }, { title: 'Author', link: '/authors' }];
const app = express();
const port = process.env.PORT || 3000;

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Library',
      nav
    }
  );
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
