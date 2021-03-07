const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the top sky skapers in the world!",
      address: "New York City",
      location: {
        lng: 40.45234,
        lan: -54.5467,
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
  }

  const getPlaceUserID = (req, res, next) => {
    const userId = req.params.uid;
  
    const place = DUMMY_PLACES.find((p) => {
      return p.creator === userId;
    });
  
    if (!place) {
      return next(
        new HttpError("Could not find a place for the provided user id.", 404)
      );
    }
  
    res.json({ place });
}

module.exports={getPlaceId, getPlaceUserID};