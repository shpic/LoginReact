const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({extended:false}));

//govori  aplikaciji da parsira http body poruke
const authRoutes = require('./server/routes/auth');
app.use('/auth',authRoutes);

app.listen(3000, ()=>{
  console.log('Server radi na 3000');
})
