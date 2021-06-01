const User = require("./../models/user");

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
    res.status(200).json({ message: 'User created sucessfully.' })
}

exports.login = async (req, res, next) => {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user){ // if the user doesn't exist
        return res.status(403).json({
            "email": {
                "msg": "We couldn't find user with that email"
            }
        })
    }

    if(user.password !== password){
        return res.status(403).json({
            "email": {
                "msg": "Invalid password"
            }
        })

    }
    res.json({
        "message": "Logged in sucessfully"
    })

}