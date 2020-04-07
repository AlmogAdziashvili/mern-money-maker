/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const Strategy = require('passport-google-oauth20');
const User = require('../models/user');
const { clientID, clientSecret } = require('../../../.config').googleCredentials;
const logger = require('../utils/logger');

module.exports = function googleStrategySetup(passport) {
  return passport.use(
    new Strategy({
      clientID,
      clientSecret,
      callbackURL: '/authentication/google/redirect',
    }, async (accessToken, refreshToken, profile, done) => {
      // if logged in successfully with google - find or create a new user and authenticate
      try {
        const {
          email, given_name, family_name,
        } = profile._json;
        let user;
        user = await User.findOne({ email });
        if (!user) {
          user = await new User({
            email,
            firstName: given_name,
            lastName: family_name,
            googleAccount: true,
          }).save();
        }
        logger.info(`user: ${user.id} logged in successfully using google`);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );
};
