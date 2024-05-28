const Listing = require("./models/listing");
const Reviews = require("./models/reviews.js");
const {reviweSchema}= require("./scheme.js");
const {listingSchema}= require("./scheme.js");
const expressError = require("./utils/expressError.js");
module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash('error','You must be logged in to do that!')
        return res.redirect('/login')
    }
    next();
}

module.exports.saveOringanlUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl
        
    }
 next()
};

module.exports.isOwner= async(req,res,next)=>{
    let {id} =req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/listings/${id}`)
    }
next()
}


module.exports.validateReviwes =(req,res,next)=>{
    const {error} = reviweSchema.validate(req.body);
    if(error){
        throw new expressError(400,error);
    }else{
        next();
    }

}
module.exports.validateListing =(req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400,error);
    }else{
        next();
    }

}

module.exports.isReviewsOwner= async(req,res,next)=>{
    let {id,ReviewsId} =req.params;
    let review = await Reviews.findById(ReviewsId)
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/listings/${id}`)
    }
next()
}