const express = require('express');
const { getAllBlogs, getBlogById, createBlog, deleteBlog,getMyBlogs,updateBlog} = require('../controllers/blogController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.get('/', getAllBlogs);
router.use(requireAuth)


router.get('/myblogs', getMyBlogs);

router.get('/:id', getBlogById);

router.post('/', createBlog);

router.patch('/update/:id', updateBlog);

router.delete('/:id', deleteBlog);


module.exports = { router };
