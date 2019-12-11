var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    id: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
    name: { type: String },
    intro: { type: String },
    price: { type: Number },
    age: { type: Number },
    gender: { type: String },
    address: { city: Number, district: Number },
    avatar: { type: String },
    comments: [{ id: String, author: String, content: String, datetime: Date }],
    contracts: [
        {
            id: String,
            name: String,
            beginTime: Date,
            endTime: Date,
            totalPrice: Number,
            status: String
        }
    ],
    star: { type: Number },
    skills: [String]
});

const User = mongoose.model('student', userSchema);

module.exports = User;
