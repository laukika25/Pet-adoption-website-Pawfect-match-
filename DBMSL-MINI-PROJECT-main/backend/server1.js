require('dotenv').config()

const express = require('express')
const cors = require("cors");
// const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const memberroutes = require('./routes/member_routes')
const { default: mongoose } = require('mongoose')

//express app
const app = express()

//global middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/member_routes', memberroutes)

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    //listen for requests
//     app.listen(process.env.PORT, () => {
//     console.log('Connected to db and listening on port ', process.env.PORT)
    // })
    app.listen(4001, () => {
    console.log("Server is running on port 4001");
});
}).catch((error) => {
    console.log(error)
})


