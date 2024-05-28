const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing}= require("../midelware.js")
const listingControllers= require("../controllers/listing.controllers.js")
const multer=require("multer");
const {storage}=require("../cloudConfigure.js");
const upload=multer({storage});

// index route
router.get("/",wrapAsync(listingControllers.index));
  
  // create route
    router.get("/new",isLoggedIn,listingControllers.newformRender)
    router.post("/", isLoggedIn,wrapAsync(listingControllers.createListing))

// show  route
router.get("/:id",listingControllers.showListing);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.editform));
//update route
router.put("/:id",isLoggedIn,isOwner,listingControllers.editListing)

//delte route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingControllers.deleteListing))






module.exports = router;