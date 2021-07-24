const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 32
        },
        answerRequired: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
