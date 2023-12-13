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

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
  res.json('test okay');
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

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc){
    // const passOk = bcrypt.compareSync(password,userDoc.password);
    // if (passOk){
    //   res.json('pass ok');
    // } else {
    //   res.status(422).json('pass not ok');
    // }
    res.json('found');
  } else {
    res.json('not found');
  }
});


app.listen(4000);
