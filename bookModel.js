const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    releaseYear: { type: Number },
    genre: { type: String },
  },
  { timestamps: true },
);
const BookModel = mongoose.model("BookModel", BookSchema);
module.exports = { BookModel };
