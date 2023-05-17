const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        categoryType: { type: String, required: true },
        img: {type: String, required: true}
    },
    { timestamps: true },
   
);

module.exports = mongoose.model("Category", CategorySchema);
