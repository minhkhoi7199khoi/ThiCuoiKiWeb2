const express = require('express');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const restrict = require('../middlewares/auth.mdw');
const config = require('../config/default.json');

const router = express.Router();

router.get('/login', async function (req, res) {
  res.render('viewAccount/login', {
  });
})

router.post('/login', async function (req, res) {
  const user = await userModel.singleByUserName(req.body.f_Username);
  if (user === null) {
    return res.render('viewAccount/login', {
      err: 'Invalid username or password.'
    })
  }

  const rs = bcrypt.compareSync(req.body.f_Password, user.f_Password);
  if (rs === false) {
    return res.render('viewAccount/login', {
      err: 'Invalid username or password.'
    })
  }

  delete user.f_Password_hash;
  if(user.f_Permission == 1)
  {
    req.session.isAdmin = true
  }
  else req.session.isAdmin = false
  req.session.isAuthenticated = true;
  req.session.authUser = user;

  const url = req.query.retUrl || '/';
  res.redirect('/home')
})

router.post('/logout', restrict, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
})

router.get('/register', async function (req, res) {
  res.render('viewAccount/register');
})

router.post('/register', async function (req, res) {
  const dob = moment(req.body.f_DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const password_hash = bcrypt.hashSync(req.body.f_Password, config.authentication.saltRounds);
  const entity = {
    f_Username: req.body.f_Username,
    f_Password:password_hash,
    f_Name: req.body.f_Name,
    f_Email: req.body.f_Email,
    f_DOB: dob,
    f_Permission: 0
  }
console.log(entity);
  await userModel.add(entity);
  res.redirect('/home')
})

router.get('/profile', restrict, async function (req, res) {
  console.log(req.session.authUser);
  res.render('viewAccount/profile');
})

router.get('/is-available', async function (req, res) {
  const user = await userModel.singleByUserName(req.query.user);
  if (!user) {
    return res.json(true);
  }

  res.json(false);
})

module.exports = router;