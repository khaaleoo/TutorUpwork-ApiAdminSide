var mongoose = require("mongoose");

var contractSchema = mongoose.Schema({
    id: {
        type: String
    },
    studentId: {
        type: String
    },
    tutorId: {
        type: String
    },
    skill: {
        type: String
    },
    beginTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    pricePerHour: {
        type: Number
    },
    totalHour: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String
    }
});

const Contract = mongoose.model('contract', contractSchema);

module.exports = Contract;
