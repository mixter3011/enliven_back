const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model("Child", childSchema);