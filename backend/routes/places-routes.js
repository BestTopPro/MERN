const express = require("express");
const placeController = require('../controllers/places-controllers');
const router = express.Router();


router.get("/:pid",placeController.getPlaceId);
router.get("/user/:uid",placeController.getPlaceUserID);

module.exports = router;
