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
    birthday: { type: Date },
    gender: { type: String },
    address: { city: Number, district: Number },
    avatar: { type: String },
    contracts: [String],
});

const User = mongoose.model('student', userSchema);

module.exports = User;
