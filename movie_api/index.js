const express = require("express"),
  morgan = require("morgan");

const app = express();

let topMovies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling"
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien"
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer"
  },
  {
    title: "Rush Hour",
    author: "Jackie Chan"
  },
  {
    title: "Ip Man",
    author: "Donnie Yen"
  },
  {
    title: "Fearless",
    author: "Jet Li"
  },
  {
    title: "Avengers",
    author: "Stan Lee"
  },
  {
    title: "Spirited Away",
    author: "Hayao Miyazaki"
  },
  {
    title: "Rurouni Kenshin",
    author: "Kaoru Kamiya"
  },
  {
    title: "Despicable Me",
    author: "Pixar"
  }
];

app.use(morgan("common"));
app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// GET requests

app.get("/", (req, res) => {
  res.send("Welcome to my movie club!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/secreturl", (req, res) => {
  res.send("This is a secret url with super top-secret content.");
});

//Create server

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
