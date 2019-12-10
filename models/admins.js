var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var beautifyUnique = require("mongoose-beautiful-unique-validation")

var adminSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'password must has more than 6 characters.']
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 'Two admin cannot share the same email'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
    },
});

// enables beautifying
adminSchema.plugin(beautifyUnique);

// hash user password before saving into database
adminSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// // check password valid?
// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

const User = mongoose.model('admin', adminSchema);

module.exports = User;
