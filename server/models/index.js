const mongoose = require('mongoose');

module.exports.connect=(uri)=>{
  mongoose.connect(uri);
  //ukljucujemo promise biblioteku
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error',(err)=>{
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  //ucitavanje modela
  require('./user');
}
