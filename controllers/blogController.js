const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/userModel');

async function getMyBlogs(req, res) {
  // console.log(req.user)
  const user_id = req.user._id
  const user = await User.findById(user_id)
  username = user.username
  try {
    const blogs = await Blog.find({ username }).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getAllBlogs(req, res) {
  const user_id = req.user._id
  const user = await User.findById(user_id)
  username = user.username
  // console.log(user_id)
  try {
    const blogs = await Blog.find({ username: { $ne: username } }).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getBlogById(req, res) {
const {id} = req.params
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
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
    const user_id = req.user._id
    // console.log(user_id)
    const user = await User.findById(user_id)
    username = user.username
    // console.log(username)
    const blog = await Blog.create({ title, snippet, body, username });
    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: 'Bad request' });
  }
}

async function updateBlog(req, res) {
  const { title, snippet, body } = req.body;
  const {id} = req.params;
  // console.log(id)
  try {
    const user_id = req.user._id
    const user = await User.findById(user_id)
    username = user.username
    const blog = await Blog.findByIdAndUpdate({_id:id,username:username},
      { title, snippet, body },
      { new: true } // Returns the updated document
      )
    // console.log("update success")
    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: 'Update failed due to some error' });
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

module.exports = { getAllBlogs, getBlogById, createBlog, deleteBlog, getMyBlogs ,updateBlog};
