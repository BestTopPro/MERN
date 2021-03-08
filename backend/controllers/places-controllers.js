const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const userId = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the top sky skapers in the world!",
    address: "New York City",
    location: {
      lng: 40.45234,
      lat: -54.5467,
    },
    creator: "u1",
  },
];

const getPlaceId = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place });
};

const getPlacesUserID = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = getCoordsForAddress();
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: userId(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

module.exports = {
  getPlaceId,
  getPlacesUserID,
  createPlace,
  updatePlace,
  deletePlace,
};
