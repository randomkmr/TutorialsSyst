const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { port } = require('./config');
const routesAuth = require('./server/routes/users.js');
const routesTutorials = require('./server/routes/tutorials');
const exphbs = require('express-handlebars');

const app = express();

// Static files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.json(), cors(), cookieParser());

app.use('/', routesAuth);
app.use('/', routesTutorials);

app.use('/testas', (req,res) => {
    res.send('testas');
    console.log('testas');
});

app.all('*', (req,res) => {res.send('klaida')});

app.listen(port, () => {
    console.log(
      `My app is running and listening to port http://localhost:${port}/`
    );
  });