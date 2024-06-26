require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {router} = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
const uri = process.env.MONG_URI;
const cors = require('cors');

// express app
const app = express()

const corsOptions = {
  origin: ['https://vjti-blog.vercel.app/','http://localhost:3000'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 
};
app.options('*', cors(corsOptions))
app.use(cors(corsOptions)); 
// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/vjti/user',userRoutes)
app.use('/vjti', router)

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
