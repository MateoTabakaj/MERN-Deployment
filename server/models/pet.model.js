const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3,"Pet name should have at least 3 characters"],
        required: [true, "Pet name is required"]

    },
    type: {
        type: String,
        minlength: [3,"Pet type should have at least 3 characters"],
        required: [true, "Pet type is required"]

    },
    description: {
        type: String,
        minlength: [3,"Pet description should have at least 3 characters"],
        required: [true, "Pet description is required"]
    },
    firstSkill: {
        type: String
    },
    secondSkill: {
        type: String
    },
    thirdSkill: {
        type: String
    },
    likes:{type: Number}
},
    { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
