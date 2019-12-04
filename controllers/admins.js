const adminModel = require('../models/admins');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretKey = require('../middleware/passport');

module.exports = {
    create: function(req, res, next) {
      adminModel.findOne({email: req.body.email}, function(err, doc){
         if(err) throw err;
         if (doc == null){
            adminModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role }, function (err) {
               if (err) 
                next(err);
               else
                res.json({status: "success", message: "Admin added successfully!!!", data: null});
               
             });
         }
         else {
            res.json({status: "failed", message: "Failed to create new Admin, Email has been registed before.", data: null})
         }
      })
    },
    login: function(req,res){
       console.log("vao day")
      passport.authenticate('local-login', {session: false}, (err, admin, info) => {
         if (err || !admin) {
             return res.status(400).json({
                 status: "Login failed",
                 message: info ? info.message : 'Login failed',
             });
         }

         req.login(admin, {session: false}, (err) => {
             if (err) {
                 res.send(err);
             }
             const body = { _id : admin._id, email : admin.email };
             const token = jwt.sign({admin: body}, secretKey.secretKey, { expiresIn: '1h' });
             return res.json({status: "Login successful", token});
         });
     })(req, res);
   },
}