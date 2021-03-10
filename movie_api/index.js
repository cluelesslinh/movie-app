const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

let movies = [
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

let directors = ["Jackie Chan", "Hayao Miyazaki", "Steven Spielburg"];

let genres = ["Action", "Comedy", "Horror"];

app.use(bodyParser.json());
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

app.get("/users", (req, res) => {
  res.send("Successful GET request returning user info.");
});

app.get("/users/:id", (req, res) => {
  res.json(
    users.find(user => {
      return user.id === req.params.id;
    })
  );
});

app.get("/movies", (req, res) => {
  res.send("Successful GET request returning data for all movies.");
});

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/users/id/movies/favorites", (req, res) => {
  res.send("Successful GET request returning data for all favorite movies.");
});

app.get("/genres", (req, res) => {
  res.send("Successful GET request returning data for all genres.");
});

app.get("/genres/:title", (req, res) => {
  resjson(
    genres.find(genre => {
      return genre.title === req.params.title;
    })
  );
});

app.get("/directors", (req, res) => {
  res.send("Successful GET request returning data for all directors.");
});

app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find(director => {
      return director.name === req.params.name;
    })
  );
});

// POSTS requests

app.post("users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.post("/users/id/movies/favorites", (req, res) => {
  res.send("Successful POST to add new favorite movie.");
});

//PUT requests

// DELETE request

app.delete("/users/id/movies/favorites", (req, res) => {
  res.send("Successful DELETE of listed favorite movie.");
});

//Create server

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
