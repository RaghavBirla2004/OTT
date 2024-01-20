const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

//!! Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
