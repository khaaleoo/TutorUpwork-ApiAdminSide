const userModel = require('../models/users');
const tutorModel = require('../models/tutors')
const studentModel = require('../models/students')
const contractModel = require('../models/contracts')

const jwt = require('jsonwebtoken');
const secretKey = require('../middleware/passport');

module.exports = {
    list: function (role) {
        return function (req, res) {
            jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
                if (err) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Unauthorized",
                    });
                }

                var usersList = {};
                userModel.find({ role }, (err1, res1) => {
                    if (err1) {
                        return res.status(400).json({
                            status: "failed",
                            message: err1,
                        });
                    }
                    usersList = Object.assign(res1, usersList)
                    return res.status(200).json({
                        status: "success",
                        list: usersList,
                    });
                });

            })
        }
    },
    detail: function (role) {
        return function (req, res) {
            jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
                if (err) {
                    return res.status(401).json({
                        status: "failed",
                        message: "Unauthorized",
                    });
                }

                let model;
                if (role === "tutor") {
                    model = tutorModel
                }
                else {
                    model = studentModel
                }

                const id = req.query.id
                model.findOne({ id }, (err1, res1) => {
                    if (err1) {
                        return res.status(400).json({
                            status: "failed",
                            message: err1,
                        });
                    }
                    return res.status(200).json({
                        status: "success",
                        detail: res1,
                    });
                });

            })
        }
    },
    contracts: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            const idContractsList = req.query.list
            contractModel.find({ id: { "$in": idContractsList } }, (err1, res1) => {
                if (err1) {
                    return res.status(400).json({
                        status: "failed",
                        message: err1,
                    });
                }
                return res.status(200).json({
                    status: "success",
                    list: res1
                });
            });

        })
    },
    block: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            const id = req.body.id
            userModel.findOneAndUpdate({ id }, { valid: false }, (err1) => {
                if (err1) {
                    return res.status(400).json({
                        status: "failed",
                        message: err1,
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "blocked user"
                });
            });

        })
    },
    unblock: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            const id = req.body.id
            userModel.findOneAndUpdate({ id }, { valid: true }, (err1) => {
                if (err1) {
                    return res.status(400).json({
                        status: "failed",
                        message: err1,
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "unblocked user"
                });
            });

        })
    },
}