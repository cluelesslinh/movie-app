const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models.js");

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const app = express();

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
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).send("Error: " + err);
    });
});

app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error " + err);
    });
});

app.get("/genres", (req, res) => {
  Genres.find()
    .then(genres => {
      res.status(201).json(genres);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/genres/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then(genre => {
      res.json(genre);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error " + err);
    });
});

app.get("/directors", (req, res) => {
  Directors.find()
    .then(directors => {
      res.status(201).json(directors);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error " + err);
    });
});

app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then(director => {
      res.json(director);
    })
    .catch(err => {
      consle.error(err);
      res.status(500).send("Error: " + err);
    });
});

// POSTS requests

app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//PUT requests

app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body,
        Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// DELETE request

app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Create server

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
