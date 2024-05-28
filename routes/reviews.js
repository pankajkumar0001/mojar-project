const express = require("express")
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReviwes, isLoggedIn, isReviewsOwner } = require("../midelware.js");
const ReviewsControllers= require("../controllers/reviews.controllers.js")
 //reviews

router.post("/",isLoggedIn,validateReviwes,wrapAsync(ReviewsControllers.createReviews))

//   delete reviews
router.delete("/:ReviewsId",isLoggedIn,isReviewsOwner,wrapAsync(ReviewsControllers.deleteReviews))

module.exports= router;