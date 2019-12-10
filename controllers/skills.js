const skillModel = require('../models/skills');
const jwt = require('jsonwebtoken');
const secretKey = require('../middleware/passport');

module.exports = {
    list: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            var skillsList = {};
            skillModel.find({}, (err1, res1) => {
                if (err1) {
                    return res.status(400).json({
                        status: "failed",
                        message: err,
                    });
                }
                skillsList = Object.assign(res1, skillsList)
                return res.status(200).json({
                    status: "success",
                    list: skillsList,
                });
            });

        })
    },
    create: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err1) => {
            if (err1) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            skillModel.findOne({ name: req.body.name }, function (err2, doc) {
                if (err2) {
                    res.json({ status: "failed", message: err2 })
                }
                if (doc == null) {
                    skillModel.create({ name: req.body.name }, function (err3) {
                        if (err3)
                            res.json({ status: "failed", message: err3 })

                        else
                            res.json({ status: "success", message: "Skill added successfully!!!" });

                    });
                }
                else {
                    res.json({ status: "failed", message: "Failed to create new Skill, Skill name has been registed before." })
                }
            })
        })
    },
    remove: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            const id = req.query.id
            skillModel.deleteOne({ _id: id }, (err) => {
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
    updateInfo: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            skillModel.findOneAndUpdate({ _id: req.body.id }, { name: req.body.name }, err => {
                if (err) {
                    return res.status(400).json({ status: "failed", message: err.errors.name.message });
                }
                return res.status(200).json({ status: "success", message: "Change info successfully!!!" });
            })
        })
    },
}