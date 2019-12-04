const passport    = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt'); 

const LocalStrategy = require('passport-local').Strategy;

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const AdminModel = require('../models/admins')

var secretKey = 'nodeRestApi';
module.exports = {
    'secretKey': secretKey
}

// used to serialize the admin for the session
passport.serializeUser(function (admin, done) {
    done(null, admin.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
    AdminModel.findById(id, function (err, admin) {
        done(err, admin);
    });
});


passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
            return AdminModel.findOne({email})
                .then(user => {
                    if (!user) {
                        return cb(null, false, {message: 'Email have not been registed before.'});
                    }
                    else{
                        bcrypt.compare(password, user.password, function(err, res) {
                            if (err) return cb(err);
                            if (res === false) {
                                return cb(null, false, {
                                    message: 'Password was wrong'
                                });
                            } else {
                                return cb(null, user, {
                                    message: 'Logged In Successfully'
                                });
                            }
                        });                      
                    }
                })
                .catch(err => {
                    return cb(err);
            });
    }
));

passport.use('jwt', new JWTStrategy({
    secretOrKey : secretKey,
    jwtFromRequest : ExtractJWT.fromHeader('secret_token')
  }, async (token, done) => {
    try {
        console.log("xac thuc thanh cong: ", token)
        return done(null, token.admin.role);
    } catch (error) {
      done(error);
    }
    console.log("cuoi cung")
    }
));