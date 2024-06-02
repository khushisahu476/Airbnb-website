const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
const {validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//delete reviews route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    validateReview,
    wrapAsync(reviewController.destroyReview)
);

//post route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.newReview)
);

module.exports = router;