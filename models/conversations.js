var mongoose = require("mongoose");

var conversationSchema = mongoose.Schema({
    room: String,
    person1: { id: String, name: String, avatar: String },
    person2: { id: String, name: String, avatar: String },
    messages: [{ id: String, content: String, date: Number }],
    lastMess: { id: String, content: String, date: Number }
});

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;