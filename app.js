require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const {router} = require('./routes/blogRoutes')
const uri = process.env.MONG_URI;
const cors = require('cors');

const app = express()

const corsOptions = {
  origin: '*', 
  methods: 'GET,POST,DELETE',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions)); 
// express app



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


// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blog');
// const app = express();
// const cors = require('cors');
// const blogRoutes = require('./routes/blogRoutes')
// const uri = process.env.MONG_URI;
// const { router } = require('./routes/blogRoutes');

// app.use('/vjti/blog', blogRoutes)
// app.use(router);
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(cors());

// mongoose.connect(uri)
//   .then((result) => {
//     app.listen(process.env.PORT);
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message);
//   });



// app.get('/', (req, res) => {
//   res.redirect('/blogs');
// })


// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// })


// app.get('/blogs', async (req, res) => {

//   try {
//     const blogs = await Blog.find({}).sort({createdAt:-1})

//     res.status(200).json({ blogs })
//   }
//   catch (e) {
//     console.log(e.msg);
//   }
// })

// app.get('/blogs/:id', async (req, res) => {
//   const { id } = req.params;
//   const blog = await Blog.findById(id)

//   if (!blog) {
//     return res.status(404).json({ error: 'No such blog ' })
//   }
//   res.status(200).json(blog)
  
// })

// app.post('/blogs', async (req, res) => {
//  const {title,snippet,body} = req.body
//   try {
//     const blog = await Blog.save({title,snippet,body});
//     res.status(200).json(blog);
//   }
//   catch (err) {
//     res.status(400).json({ err: err.msg })
//   }

// });


// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create', });
// })

// app.delete('/blogs/:id', async (req, res) => {
//   const {id} = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   const blog  =await Blog.findOneAndDelete({_id:id})
//   if (!blog) {
//     return res.status(400).json({ error: 'No such blog ' })
//   }

//   res.status(200).json(blog)
// })


// app.get('/about-us',(req,res)=>{
//     res.redirect('./about');
// })

// app.use((req, res) => {
//   res.render('error', { title: 'Error' });
//   res.statusCode = 404;
// })