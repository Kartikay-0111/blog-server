require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {router} = require('./routes/blogRoutes')
const uri = process.env.MONG_URI;
const cors = require('cors');

// express app
const app = express()

const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,DELETE',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions)); 

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/vjti/blogs', router)

// connect to db
mongoose.connect(uri)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
