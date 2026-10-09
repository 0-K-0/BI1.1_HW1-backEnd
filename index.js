const { BookModel } = require("./bookModel");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const booksData = [
  {
    title: "Lean In",
    author: "Sheryl Sandberg",
    releaseYear: 2013,
    genre: "Business",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    releaseYear: 1988,
    genre: "Fiction",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    releaseYear: 2016,
    genre: "Business",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    releaseYear: 1960,
    genre: "Classic Fiction",
  },
  {
    title: "Go Set a Watchman",
    author: "Harper Lee",
    releaseYear: 2015,
    genre: "Fiction",
  },
];
const PORT = process.env.PORT || 6000;
const connectionHandler = async () => {
  try {
    await mongoose.connect(process.env.connectionStr);
    console.log("connected to Db");
  } catch (error) {
    console.error("Db connection faild:", error.message);
  }
};
connectionHandler();
app.listen(PORT, () => console.log("server running on port", PORT));
const Book_Upload = async () => {
  try {
    await BookModel.deleteMany();
    await BookModel.insertMany(booksData);
    console.log("BookUPloaded to the db Successfully");
  } catch (error) {
    console.log(error);
  }
};
// Book_Upload();
const allBooksHander = async () => {
  try {
    return await BookModel.find();
  } catch (error) {
    console.error(error);
  }
};
//show all books
app.get("/allBooks", async (req, res) => {
  try {
    const books = await allBooksHander();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "an error ocqured" });
  }
});
//show book by title
const BooksHanderByTitle = async (title) => {
  try {
    return await BookModel.findOne({ title: title });
  } catch (error) {
    console.error(error);
  }
};
app.get("/books/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const book = await BooksHanderByTitle(title);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "an error ocqured" });
  }
});

//show book by author
const BooksHanderByAuthor = async (author) => {
  try {
    return await BookModel.find({ author: author });
  } catch (error) {
    console.error(error);
  }
};
app.get("/books/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const book = await BooksHanderByAuthor(author);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "an error ocqured" });
  }
});
