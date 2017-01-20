const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//deinisanje korisnicke sheme

const UserSchema = new mongoose.Schema({
  email:{
    type : String,
    index : {unique:true}
  },
  password:String,
  name: String
});

//poredjenje prosledjene sifre sa sifrom iz baze.Model metod.
//@param{string} password
//@return{object} callback

UserSchema.methods.comparePassword = function comparePassword(password,callback){
  bcrypt.compare(password,this.password,callback);
};

//pre-save hook method
UserSchema.pre('save',function saveHook(next){
  const user = this;

  //nastavi dalje samo ako je sifra pormenjena ili novi user
  if(!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError,salt)=>{
    if (saltError){ return next(saltError);}

    return bcrypt.hash(user.password,salt,(hashError,hash) => {
      if (hashError) { return next(hashError);}
      //zameni se password sa heshiranom
      user.password=hash;

      return next();
    });
  });
});

module.exports=mongoose.model('User',UserSchema);
