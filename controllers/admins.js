const adminModel = require('../models/admins');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretKey = require('../middleware/passport');
const bossInfo = require('../config/admin');

module.exports = {
    create: function (req, res, next) {
        adminModel.findOne({ email: req.body.email }, function (err, doc) {
            if (err) throw err;
            if (doc == null) {
                adminModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role }, function (err) {
                    if (err)
                        next(err);
                    else
                        res.json({ status: "success", message: "Admin added successfully!!!", data: null });

                });
            }
            else {
                res.json({ status: "failed", message: "Failed to create new Admin, Email has been registed before.", data: null })
            }
        })
    },
    login: function (req, res) {
        passport.authenticate('local-login', { session: false }, (err, admin, info) => {
            if (err || !admin) {
                return res.status(400).json({
                    status: "Login failed",
                    message: info ? info.message : 'Login failed',
                });
            }

            req.login(admin, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                const body = { _id: admin._id, role: admin.role };
                const token = jwt.sign({ admin: body }, secretKey.secretKey, { expiresIn: '1h' });
                return res.json({ status: "Login successful", token: token, role: admin.role });
            });
        })(req, res);
    },
    list: function (req, res) {
        passport.authenticate('jwt', { session: false }, (err, role) => {
            if (role === false) {
                return res.status(400).json({
                    status: "Get list admin failed",
                    message: "Unauthorized",
                });
            }
            if (err) {
                return res.status(400).json({
                    status: "Get list admin failed",
                    message: "Somthing wrong",
                });
            }
            if (role !== bossInfo.roleOfBoss) {
                return res.status(400).json({
                    status: "Get list admin failed",
                    message: "Only Master can get admins list",
                });
            }
            // only "role: master" can get admins list
            var adminsList = {};
            adminModel.find({ role: { $nin: ["master"] } }, (err, res1) => {
                //  console.log("responeeee: ", res)
                adminsList = Object.assign(res1, adminsList)
                return res.status(400).json({
                    status: "Get admins list success",
                    list: adminsList,
                });
            });

        })(req, res);
    },
}