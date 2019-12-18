const contractModel = require('../models/contracts');
const jwt = require('jsonwebtoken');
const secretKey = require('../middleware/passport');

module.exports = {
    list: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            var contractsList = {};
            contractModel.find({}, (err1, res1) => {
                if (err1) {
                    return res.status(400).json({
                        status: "failed",
                        message: err,
                    });
                }
                contractsList = Object.assign(res1, contractsList)
                return res.status(200).json({
                    status: "success",
                    list: contractsList,
                });
            });

        })
    },
    updateInfo: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err, decoded) => {
            if (err || decoded.role === false) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            contractModel.findOneAndUpdate({ id: req.body.id }, { status: req.body.status }, function (err) {
                if (err) {
                    return res.status(400).json({ status: "failed", message: err });
                }
                else {
                    return res.status(200).json({ status: "success", message: "Change status successfully!!!" });
                }
            })
        })
    },
}