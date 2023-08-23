const User = require('../models/userModel')
const { MongoClient } = require("mongodb")
const dotenv = require('dotenv')

dotenv.config()
const dbUrl = process.env.DB_URL
const client = new MongoClient(dbUrl, {
    //
})

client.connect()
const dbName = "mern"
const collectionName = "users"
const database = client.db(dbName);
const collection = database.collection(collectionName)

exports.addUser = async(req, res) => {
    if (req) {
        console.log(req.body)
        const {username, email} = req.body
        if (username.trim().length == 0) {
            console.log("Username is required")
            res.status(400).json({message:"no_username", data: null})
        }else if (email.trim().length == 0) {
            console.log("Email is required")
            res.status(400).json({message:"no_email", data: null})
        }else {
            await collection.findOne({email:email})
            .then((user) => {
                if (user) {
                    console.log('user exist')
                    res.status(400).json({message : 'user_exist', data : null})
                }else {
                    collection.insertOne(req.body)
                    .then((result) => {
                        if (result) {
                            console.log('Result', result)
                            collection.find({}).toArray((err, allUsers) => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({message : 'server_error', data : null})
                                }else {
                                    console.log('User added', allUsers)
                                    res.status(200).json({message : 'user_added', data : allUsers})
                                    client.close()
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({message : 'server_error', data : null})
                    }) 
                }
            })
        }
    }
}