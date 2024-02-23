const mongoose = require("mongoose");
const express = require("express");

// This sets up the express server and defines a port to use
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// This connects to the Mongo server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongo-media-db");

// This sets it to listen and gets the whole thing moving
mongoose.set("debug", true);
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));