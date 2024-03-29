const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
//const mongoose = require('mongoose')
const userRoute = require('./src/routes/userRoutes')

dotenv.config()

const app = express()
const port = 9000
//const dbUrl = process.env.DB_URL

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(userRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})