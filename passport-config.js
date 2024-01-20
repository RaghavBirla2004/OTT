const LocalStrategy = require("passport-local").Strategy;
const User = require("./database");

exports.initializePassport = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false);
      } else if (user.password !== password) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      return done(e, false);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => { // Fix the syntax here
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      done(e, false);
    }
  });
};


exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        res.redirect("/login");
    }
};
