const express = require("express");
const bodyParser = require("body-parser");
const placeRoutes = require("./routes/places-routes");
const UserRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const db_config = require("./util/DB-config");

const app = express();
app.use(bodyParser.json());

app.use("/api/places", placeRoutes);
app.use("/api/users", UserRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//connect to DB
const URL = db_config.URL;
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
