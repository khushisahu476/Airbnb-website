const Listing = require("../models/listing");

module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};


module.exports.renderNewForm = (req , res) => {
    res.render('listings/new.ejs');
};

module.exports.showListings = async(req,res) => {
    let {id } = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error" ,"Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing}); 
};

module.exports.createListing = async ( req, res ,next) => {
    const newlisting = new Listing(req.body.listing);
    console.log(req.user);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success" ,"New Listing Created");
    res.redirect("/listings");
};
module.exports.rendrEditForm = async(req,res,next) => {
    let {id} = req.params; 
    let newdata = await Listing.findById(id);
    if(!newdata){
        req.flash("error" ,"Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    req.flash("success" ,"Listing Edited");
    res.render("listings/edit.ejs",{newdata});
}

module.exports.updateListing = async(req , res) => {
    let {id} = req.params;
    const updateResult = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success" ,"Listing Updated");
    res.redirect(`/listings/${id}`);
 }

 module.exports.destroyListing = async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    req.flash("success" ,"Listing Deleted");
    res.redirect("/listings");
}