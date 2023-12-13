const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/users.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(6);

app.use(express.json());
app.use(cors({
  credentials: true,
  origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
  res.json('test ok');
});

app.post('/register', async(req,res) => {
  const {name,email,password} = req.body;

  try {
    const userInfo = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userInfo);
  } catch (e) {
    res.status(422).json(e);
  }

});


app.listen(4000);
