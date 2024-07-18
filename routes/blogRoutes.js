const express = require('express');
const { getAllBlogs, getBlogById, createBlog, deleteBlog,getMyBlogs,updateBlog , likeBlog,unlikeBlog} = require('../controllers/blogController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getAllBlogs);

router.get('/myblogs', getMyBlogs);

router.get('/:id', getBlogById);

router.post('/', createBlog);

router.patch('/update/:id', updateBlog);

router.delete('/:id', deleteBlog);

router.patch('/like/:id',likeBlog);

router.patch('/unlike/:id',unlikeBlog);

module.exports = { router };
