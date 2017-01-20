const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

//auth checker funkcija srednjeg sloja

module.exports = (req,res,next) =>{
  if(!req.headers.authorization){

    return res.status(401).end();
  }
  //uzimamo  poslednji deo autorizacionog heder stringa
  const token = req.headers.authorization.split(' ')[1];

  //deokdiranje token koristeci tajnu frazu
  return jwt.verify(token,config.jwtSecret,(err,decoded)=>{
    //401 je kod za neautorizovan status
    if (err) {return res.status(401).end();}

    const userId = decoded.sub;

    //provera da li user postoji

    return User.findById(userId,(userErr,user)=>{
      if (userErr || !user){
        return res.status(401).end();
      }

      return next();
    });
  });
};
