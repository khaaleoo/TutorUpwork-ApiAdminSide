const conversationModel = require('../models/conversations');

const jwt = require('jsonwebtoken');
const secretKey = require('../middleware/passport');

module.exports = {
    detail: function (req, res) {
        jwt.verify(req.headers.secret_token, secretKey.secretKey, (err) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                });
            }

            const id1 = req.body.id1
            const id2 = req.body.id2

            conversationModel.findOne(
                {
                    $or: [
                        { $and: [{ 'person1.id': id1 }, { 'person2.id': id2 }] },
                        { $and: [{ 'person1.id': id2 }, { 'person2.id': id1 }] }
                    ]
                },
                (err1, res1) => {
                    if (err1) {
                        return res.status(400).json({
                            status: "failed",
                            message: err1,
                        });
                    }
                    if (res1 === null) {
                        return res.status(200).json({
                            status: "success",
                            detail: {},
                        });
                    }
                    return res.status(200).json({
                        status: "success",
                        detail: res1,
                    });
                });

        })
    },
}