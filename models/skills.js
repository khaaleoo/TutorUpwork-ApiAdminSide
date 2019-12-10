var mongoose = require("mongoose");

var skillSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    }
});

const Skill = mongoose.model('skill', skillSchema);

module.exports = Skill;
