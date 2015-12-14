let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: String,
  personId: Schema.Types.ObjectId,
  created_at: {type: Date, default: Date.now}
  updated_at: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next){
  let user = this;
  bcrypt.genSalt(12, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hashedPassword){
      if(err) return next(err);
      user.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods.authenticate = function(password, callback){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
