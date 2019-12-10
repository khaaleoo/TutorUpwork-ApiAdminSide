var mongoose = require("mongoose");
var beautifyUnique = require("mongoose-beautiful-unique-validation")

var skillSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: 'Two kills cannot share the same name'
    }
});

// enables beautifying
skillSchema.plugin(beautifyUnique);

const Skill = mongoose.model('skill', skillSchema);

module.exports = Skill;
