const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [emailValidator, 'incorrect mail address']
    },
    password: {type: String, required: true}
})

function emailValidator(value){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))
    {
      return true
    }
      alert("You have entered an invalid email address!")
      return false
}

userSchema.pre('save', async function(next){
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
      next();
    }catch(error){
      next(error);
    }
});


module.exports = mongoose.model('user', userSchema);