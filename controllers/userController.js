const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }


    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Authenticate user with email and password
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Get user role
    const role = user.role;

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send JWT token to client
    res.json({ token, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, password, role } = req.body;

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;

    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  getAllUsers,
  getUserById,
  editUser,
};

