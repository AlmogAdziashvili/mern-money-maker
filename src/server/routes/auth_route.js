/* eslint-disable camelcase */
const express = require('express');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const path = require('path');
const { sendResetMail } = require('../utils/mail');
const {
  statusCodes, onlyGuests, generateError, onlyUsers,
} = require('../utils/utils');
// const { resetPage } = require('../../../.config').webServerUrls;
const User = require('../models/user');
const logger = require('../utils/logger');
const { jwtCredentials } = require('../../../.config');

const router = express.Router();

// Send the user currently logged in
router.get('/user/current', (req, res) => (req.user ? res.status(statusCodes.OK).json({
  email: req.user.email,
  firstName: req.user.firstName,
  lastName: req.user.lastName,
}) : generateError(req, res, statusCodes.unauthorized, 'no user logged in')));

// Send the user currently logged in Watch List
router.get('/user/current/watchlist', (req, res) => (req.user ? res.status(statusCodes.OK).json({
  watchList: req.user.watchList,
}) : generateError(req, res, statusCodes.unauthorized, 'no user logged in')));

// Send the user currently logged in
router.get('/user/reset/:token', onlyGuests('/'), (req, res) => res.sendFile(path.resolve(__dirname, '../../', 'client', 'views', 'reset.html')));

// User registeration
router.post('/user',
  onlyGuests(),
  async (req, res) => {
    try {
      const {
        email,
        firstName,
        lastName,
        password,
      } = req.body;
      if (
        !email
        || !firstName
        || !lastName
        || !password
      ) return generateError(req, res, statusCodes.badRequest, 'missing credentials');
      if (
        password.length < 8
        || !firstName.match(/^[A-Za-z]+$/)
        || !lastName.match(/^[A-Za-z]+$/)
        || !email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ) return generateError(req, res, statusCodes.badRequest, 'unvalid credentials');
      const user = await User.findOne({ email });
      if (user) return generateError(req, res, statusCodes.badRequest, 'user exists');
      const hashed_password = await hash(password, 10);
      await new User({
        email,
        firstName,
        lastName,
        password: hashed_password,
      }).save();
      logger.info(`new user registered, email: ${email}`);
      return res.sendStatus(statusCodes.created);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

// User log in
router.post('/user/login',
  onlyGuests(),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return generateError(req, res, statusCodes.badRequest, 'missing credentials');
      const user = await User.findOne({ email });
      if (!user) return generateError(req, res, statusCodes.unauthorized, 'wrong email or password');
      if (!user.password) return generateError(req, res, statusCodes.unauthorized, 'google account');
      const isMatch = await compare(password, user.password);
      if (!isMatch) return generateError(req, res, statusCodes.unauthorized, 'wrong email or password');
      logger.info(`user: ${user.id} logged in successfully`);
      return res.cookie('jwt', sign({ id: user.id }, jwtCredentials.secret, { expiresIn: '12h' }), { maxAge: 43200000 }).sendStatus(statusCodes.OK);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

// User info update
router.put('/user',
  onlyUsers(),
  async (req, res) => {
    try {
      const { first_name, last_name, watchList } = req.body;
      if (!first_name && !last_name && !watchList) return generateError(req, res, statusCodes.badRequest, 'missing credentials');
      if (last_name) {
        if (!last_name.match(/^[A-Za-z]+$/)) return generateError(req, res, statusCodes.badRequest, 'unvalid credentials');
        req.user.lastName = last_name;
      }
      if (first_name) {
        if (!first_name.match(/^[A-Za-z]+$/)) return generateError(req, res, statusCodes.badRequest, 'unvalid credentials');
        req.user.firstName = first_name;
      }
      if (watchList) {
        req.user.watchList = watchList;
      }
      await req.user.save();
      logger.info(`user updated info, email: ${req.user.email}`);
      return res.sendStatus(statusCodes.OK);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

// User reset token update
router.put('/user/reset',
  async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return generateError(req, res, statusCodes.badRequest, 'missing credentials');
      const buffer = randomBytes(20);
      const token = buffer.toString('hex');
      const user = await User.findOne({ email });
      if (!user) return generateError(req, res, statusCodes.notFound, 'user not exists');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
      await sendResetMail(email, 'localhost:3000/authentication/user/reset/', token);
      logger.info(`user asked to change password, email: ${user.email}`);
      return res.sendStatus(statusCodes.OK);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

// User reset token update
router.put('/user/reset/:token',
  async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      if (!token || !password) return generateError(req, res, statusCodes.badRequest, 'missing credentials');
      if (password.length < 8) return generateError(req, res, statusCodes.badRequest, 'unvalid credentials');
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gte: Date.now(),
        },
      });
      if (!user) return generateError(req, res, statusCodes.notFound, 'user not exists');
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      logger.info(`user changed the password, email: ${user.email}`);
      return res.sendStatus(statusCodes.OK);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

// User account delete
router.delete('/user',
  onlyUsers(),
  async (req, res) => {
    try {
      const { id } = req.body;
      if (Number.isNaN(parseInt(id, 10))) return generateError(req, res, statusCodes.badRequest, 'unvalid credentials');
      await User.destroy({ where: { id } });
      logger.info(`user deleted, id: ${id}`);
      return res.sendStatus(statusCodes.OK);
    } catch (err) {
      return generateError(req, res, statusCodes.internalServerError, 'server error');
    }
  });

module.exports = router;
