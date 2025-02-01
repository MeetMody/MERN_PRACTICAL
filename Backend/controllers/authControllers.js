const bcrypt = require('bcryptjs');
const User = require('../models/user');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findByEmail(email);

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create(firstName, lastName, email, hashedPassword, role);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Step 1: Check if the user exists
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      // Step 2: Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
  
      // Step 3: Check the user's role
      if (user.role !== 'admin') {
        throw new Error('You are not allowed to login');
      }
  
      // Step 4: If all checks pass, send a success response
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = { register, loginUser };
