const User = require('../models/userModel')

exports.addUser = (req, res) => {
    if (req.body.username.trim().length == 0) {
        console.log("No username in body")
        res.status(400).json({"message":"no_input"})
    }else if (req.body.email.trim().length == 0) {
        console.log("No email in body")
        res.status(400).json({"message":"no_input"})
    }else {
        console.log('Request received', req.body)
        const user = new User(req.body)
        user.save()
        .then((result) => {
            console.log("User created", result)
            res.status(200).json({"message":"user_created"})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message : "internal_error"})
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json({message : users})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message : "internal_error"})
    }
}