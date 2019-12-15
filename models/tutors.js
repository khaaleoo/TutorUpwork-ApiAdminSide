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
    birthday: { type: Date },
    gender: { type: String },
    address: { city: Number, district: Number },
    avatar: { type: String },
    comments: [{ id: String, author: String, content: String, datetime: Date }],
    contracts: [String],
    star: { type: Number },
    skills: [String],
    successRate: {
        type: Number
    }
});

const User = mongoose.model('tutor', userSchema);

module.exports = User;
