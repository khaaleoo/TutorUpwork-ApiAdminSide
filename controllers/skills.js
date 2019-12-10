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
}