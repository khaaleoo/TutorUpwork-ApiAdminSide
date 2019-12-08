const adminModel = require('../models/admins');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretKey = require('../middleware/passport');
const bossInfo = require('../config/admin');

module.exports = {
    create: function (req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, role) => {
            if (role === false) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "Somthing wrong",
                });
            }
            if (role !== bossInfo.roleOfBoss) {
                return res.status(400).json({
                    status: "failed",
                    message: "Only Master can get admins list",
                });
            }
            adminModel.findOne({ email: req.body.email }, function (err, doc) {
                if (err) throw err;
                if (doc == null) {
                    adminModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err) {
                        if (err)
                            next(err);
                        else
                            res.json({ status: "success", message: "Admin added successfully!!!" });

                    });
                }
                else {
                    res.json({ status: "failed", message: "Failed to create new Admin, Email has been registed before." })
                }
            })
        })(req, res);

    },
    login: function (req, res) {
        passport.authenticate('local-login', { session: false }, (err, admin, info) => {
            if (err || !admin) {
                return res.status(400).json({
                    status: "failed",
                    message: info ? info.message : 'Login failed',
                });
            }

            req.login(admin, { session: false }, (err) => {
                if (err) {
                    return res.status(400).json({
                        status: "failed",
                        message: err,
                    });
                }
                console.log("role la : ", admin.role)
                const token = jwt.sign({ _id: admin._id, role: admin.role }, secretKey.secretKey, { expiresIn: '1h' });
                return res.json({ status: "success", token: token, role: admin.role });
            });
        })(req, res);
    },
    list: function (req, res) {
        passport.authenticate('jwt', { session: false }, (err, role) => {
            if (role === false) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "Somthing wrong",
                });
            }
            if (role !== bossInfo.roleOfBoss) {
                return res.status(400).json({
                    status: "failed",
                    message: "Only Master can get admins list",
                });
            }
            // only "role: master" can get admins list
            var adminsList = {};
            adminModel.find({ role: { $nin: ["master"] } }, (err, res1) => {
                //  console.log("responeeee: ", res)
                adminsList = Object.assign(res1, adminsList)
                return res.status(200).json({
                    status: "success",
                    list: adminsList,
                });
            });

        })(req, res);
    },
    remove: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err, decoded) => {
            if (err || decoded.role === false) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            // bossInfo.roleOfBoss = 'master'
            if (decoded.role !== bossInfo.roleOfBoss) {
                return res.status(400).json({
                    status: "failed",
                    message: "Only Master can remove other admin",
                });
            }

            // only "role: master" can remove other admin
            const id = req.query.id
            adminModel.deleteOne({ _id: id }, (err) => {
                //  console.log("responeeee: ", res)
                if (err) {
                    return res.status(400).json({
                        status: "failed",
                        message: err,
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "delete successful",
                });
            });
        })

    },
}