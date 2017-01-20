const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

//return passport local strategy objekat

module.exports = new PassportLocalStrategy({
  usernameField:'email',
  passwordField:'password',
  session:false,
  passReqToCallback: true
},(req,email,password,done)=>{
  const userData = {
    email:email.trim(),
    password:password.trim()
  };

  //nadji usera po emailu
  return User.findOne({email: userData.email},(err,user)=>{
    if(err) {return done(err);}

    if(!user){
      const error = new Error('Pogresna adresa ili sifra');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    //provera da li je hesovana lozinka usera odgovara onoj u bazi

    return user.comparePassword(userData.password,(passwordErr,isMatch)=>{
      if (err) {return done(err);}

      if(!isMatch){
        const error = new Error('Pogresna adresa ili sifra');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      //pravljenje tokena
      const token = jwt.sign(payload,config.jwtSecret);
      const data = {
        name: user.name
      };

      return done(null,token,data);
    });
  });
});
