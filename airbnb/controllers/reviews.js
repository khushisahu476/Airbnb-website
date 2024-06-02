const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.destroyReview = async (req,res) => {
    let {id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull : { reviews : reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review is deleted!.");
    res.redirect(`/listings/${id}`);
};

module.exports.newReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New review is added!");

    console.log("new review saved");
    res.redirect(`/listings/${req.params.id}`);
};