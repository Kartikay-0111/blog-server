const mongoose = require('mongoose');
const Blog = require('../models/blog');

async function getAllBlogs(req, res) {
  const user_id = req.user._id
  // console.log(user_id)
  try {
    const blogs = await Blog.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getBlogById(req, res) {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createBlog(req, res) {
  const { title, snippet, body } = req.body;
  try {
    const user_id  = req.user._id
    const blog = await Blog.create({ title, snippet, body ,user_id});
    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: 'Bad request' });
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const blog = await Blog.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getAllBlogs, getBlogById, createBlog, deleteBlog };
