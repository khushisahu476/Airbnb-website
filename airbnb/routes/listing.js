const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner } = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");


// router
//   .route("/")
//   .get("/", wrapAsync(listingController.index))
//   .post("/", 
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );



//index route
router.get("/", wrapAsync(listingController.index));
// new Listing 
router.get("/new",isLoggedIn ,listingController.renderNewForm);

// Show details of listing
router.get("/:id",wrapAsync(listingController.showListings));


//CREATE ROUTE
router.post("/", 
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
);
//edit route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.rendrEditForm)
);

//update route
router.put("/:id", 
     isLoggedIn,
     isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
);


//delete route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.destroyListing)
);

module.exports = router;
