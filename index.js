const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

//koneckcija na bazu i ucitavanje modela
require('./server/models').connect(config.dbUri);

const app = express();
//govori aplikaciji da pokusa da nadje staticke fajlove u ovim folderima
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
//govori  aplikaciji da parsira http body poruke
app.use(bodyParser.urlencoded({extended:false}));
//prosledjivanje passporta midleweru
app.use(passport.initialize());

//ucitavanje passport strategija
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup',localSignupStrategy);
passport.use('local-login',localLoginStrategy);

//prosledjivanje cekera autentikacije midlewera
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api',authCheckMiddleware)

//routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth',authRoutes);
app.use('/api',apiRoutes);

//startovanje servera
app.listen(3000, ()=>{
  console.log('Server radi na 3000');
})
