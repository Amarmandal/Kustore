const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlenght: 32,
        unique: true
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
