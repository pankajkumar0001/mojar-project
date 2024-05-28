const mongoose = require("mongoose");
const reviews = require("./reviews.js");


const listingSchema = new mongoose.Schema({


    title:String,
    description: String,
    image: {
       url:String,
       filename:String
    } ,
    price : Number,
    location : String,
    country :  String,

    reviews:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
      }
    ],
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
    
  });



const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


