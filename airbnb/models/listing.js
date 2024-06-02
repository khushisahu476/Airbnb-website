const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const User = require("./user.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title : {
      type: String,
      required:true,
    },
    description :{
      type: String,
      required:true,
    },
    image : {
      filename: {
        type:String,
        default: "filename",
      },
      url: {
       type:String,
      },
    },
    price : {
       type:Number,
       required:true,
    },
    location : {
      type:String,
      required:true,
    },
    country :{
      type:String,
      required:true,
    },
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

listingSchema.post("findOneAndDelete" ,async(listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
  
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
