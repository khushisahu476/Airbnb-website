const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
const {validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")

//delete reviews route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    //validateReview,
    wrapAsync(async(req ,res)=>{
       let {id ,reviewId} = req.params;
        let  update = await Listing.findByIdAndUpdate(id ,{$pull: {reviews:reviewId}});
        console.log(update);
        let ans = await Review.findByIdAndDelete(reviewId);
        req.flash("success" ,"Listing Review Deleted! ");
        res.redirect(`/listings/${id}`);
    })
);

//post route
router.post(
    "/",
    isLoggedIn,
    //validateReview,
    wrapAsync(async(req ,res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        console.log(newReview);
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success" ,"New Review created");
        res.redirect(`/listings/${listing._id}`);   
    })
);

module.exports = router;