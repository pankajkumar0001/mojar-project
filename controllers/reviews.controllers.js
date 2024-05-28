const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js")



module.exports.createReviews=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let reviews = new Reviews(req.body.reviews);
    reviews.author = req.user._id;
    listing.reviews.push(reviews);
    await listing.save();
    await reviews.save();
    req.flash("success","Reviews was successful")
    res.redirect(`/listings/${listing._id}`);
   
  }
  module.exports.deleteReviews=async (req,res)=>{
    let {id,ReviewsId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:ReviewsId}})
    await Reviews.findByIdAndDelete(ReviewsId);
    req.flash("success","Reviews was delete")
    res.redirect(`/listings/${id}`);
  
   
}