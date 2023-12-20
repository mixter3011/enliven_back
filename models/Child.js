const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    name: String,
    self_esteem: Number,
    general_knowledge: Number,
    age: Number
});

module.exports = mongoose.model("Child", childSchema);