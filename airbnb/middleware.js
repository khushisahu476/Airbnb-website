const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema , reviewSchema}  = require("./schema.js");
const ExpressError  = require("./utils/ExpressError.js");


module.exports.isLoggedIn =(req ,res,next)=>{
    // console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        //redirect save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" ,"you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req ,res ,next) => {
    // console.log(req.session.redirectUrl);
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log(res.locals.redirectUrl);
    }
    next();
};

module.exports.isOwner = async(req ,res, next) =>{
    let {id} = req.params;
    //console.log(id);
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listings");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//creating middleware for joi
module.exports.validateListing  = (req ,res , next)=>{
    
    let {error} = listingSchema.validate(req.body);
     console.log(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join()
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};

//creating middleware for review 
module.exports.validateReview  = (req ,res , next)=>{
    console.log(reviewSchema)
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join()
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};

//for review
module.exports.isReviewAuthor = async(req ,res,next) =>{
    let {id , reviewId} = req.params;
    let review  = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};