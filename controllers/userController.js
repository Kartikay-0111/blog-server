const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET)
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    const { email,username, password } = req.body

    try {
        const user = await User.signup(email, username,password)
        const token = createToken(user._id)

        res.status(200).json({ email,username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUser, signupUser }