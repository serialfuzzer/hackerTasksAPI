const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./../jwtsecret");

exports.register = async (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await  User.findOne({ email });
    if(user){
        res.status(403).json(
            {
                "email": {
                    "msg": "Couldn't create the account because email already exists"
                }
            }
        )
    }
    const newUser = new User({ firstName, lastName, username, email, password })
    await newUser.save();
    res.status(200).json({ message: 'success' })
}

exports.login = async (req, res, next) => {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    var dbPassword = user.password;

    if (!user){ // if the user doesn't exist
        return res.status(403).json({
            "email": {
                "msg": "We couldn't find user with that email"
            }
        })
    }
    
    const isValid = await isPasswordValid(dbPassword, password);

    if(!isValid){
        return res.status(403).json({
            "email": {
                "msg": "Invalid password"
            }
        })

    }
    res.json({
        "message": "Logged in sucessfully",
        "token": getSignedToken(user)
    })

}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
}




const isPasswordValid = async function(dbPassword, userPassword){
    try{
      return await bcrypt.compare(userPassword, dbPassword);
    }catch(error){
      throw new Error(error);
    }
  }

  const getSignedToken = user => {
      return jwt.sign({
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
      }, SECRET_KEY , {expiresIn: '6h'})
  }