const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport_google_config')(passport);
require('./config/passport_jwt_config')(passport);

const logger = require('./utils/logger');
const { jwtAutenticator } = require('./utils/utils');
require('./utils/database');

const indexRoute = require('./routes/index_route');
const apiRoute = require('./routes/api_route');
const authRouter = require('./routes/auth_route');
const googleRoute = require('./routes/google_route');

const app = express();

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use(helmet());
app.use(passport.initialize());
app.use(jwtAutenticator());

// Static
app.use(express.static(path.join(__dirname, '../../', 'build')));
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.use('/', indexRoute);
app.use('/api', apiRoute);
app.use('/authentication', authRouter);
app.use('/authentication/google', googleRoute);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404); // TODO: Error
});

module.exports = app;
