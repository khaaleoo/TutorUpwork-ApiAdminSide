var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "password must has more than 6 characters."]
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    valid: {
        type: Boolean
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
