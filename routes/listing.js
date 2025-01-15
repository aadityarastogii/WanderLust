const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingControlller = require("../controllers/listings");
const multer  = require('multer')
const {storage}= require("../cloudconfig")
const upload = multer({ storage })


router
  .route("/")
  .get(wrapAsync(listingControlller.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControlller.createListing)
  );

 
  //New Route
router.get("/new", isLoggedIn, listingControlller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingControlller.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControlller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControlller.destroyListing));


//edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControlller.editListing)
);

module.exports = router;
