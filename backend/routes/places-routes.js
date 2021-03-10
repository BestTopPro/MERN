const express = require("express");
const placeController = require("../controllers/places-controllers");
const { check } = require("express-validator");
const router = express.Router();

router.get("/:pid", placeController.getPlaceById);
router.get("/user/:uid", placeController.getPlacesByUserId);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeController.createPlace
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeController.updatePlace
);
router.delete("/:pid", placeController.deletePlace);

module.exports = router;
