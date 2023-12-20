const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
    email: String,
    password: String,
    children: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Children"
    }]
});

module.exports = mongoose.model("Parent", parentSchema);