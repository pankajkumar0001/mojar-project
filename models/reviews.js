const mongoose = require("mongoose");

const  reviewsSchema = new mongoose.Schema({
    comment:"String",
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
             
    },
})

module.exports = mongoose.model("Reviews",reviewsSchema);