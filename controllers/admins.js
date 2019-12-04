const adminModel = require("../models/admins");

module.exports = {
  create: function(req, res, next) {
    adminModel.findOne({ email: req.body.email }, function(err, doc) {
      console.log(doc);
      if (err) throw err;
      if (doc == null) {
        adminModel.create(
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
          },
          function(err) {
            if (err) next(err);
            else
              res.json({
                status: "success",
                message: "User added successfully!!!",
                data: null
              });
          }
        );
      } else {
        res.json({
          status: "failed",
          message: "Failed to create new User, Email has been registed before.",
          data: null
        });
      }
    });
  }
};
