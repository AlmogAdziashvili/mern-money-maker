/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const {
  onlyGuests, onlyUsers,
} = require('../utils/utils');

const router = express.Router();

router.get('/', onlyUsers('/login'), (req, res) => res.sendFile(path.resolve(__dirname, '../../', 'client', 'views', 'index.html')));

router.get(['/login', '/register'], onlyGuests('/'), (req, res) => res.sendFile(path.resolve(__dirname, '../../', 'client', 'views', 'authenticate.html')));

module.exports = router;
