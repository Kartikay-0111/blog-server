const express = require('express');
const { getAllBlogs, getBlogById, createBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getAllBlogs);

router.get('/:id', getBlogById);

router.post('/', createBlog);

router.delete('/:id', deleteBlog);


module.exports = { router };
