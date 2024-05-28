const Listing = require("../models/listing.js")



module.exports.index=(async(req,res)=>{
    const alllistings = await Listing.find({});
   
    res.render("listings/index.ejs",{alllistings})
  
  });
  module.exports.newformRender=((req,res)=>{
    res.render("listings/new.ejs")
})

module.exports.createListing=async(req,res,next)=>{
    // validatelisting problem flie schema
 const newListing = new Listing(req.body.listing);
   newListing.owner= req.user._id;
   console.log(newListing);  
await newListing.save();
req.flash("success","listing was successfull adding")
res.redirect("/listings")
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");
    res.render("listings/show.ejs",{listing});
}


module.exports.editform=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}

module.exports.editListing=async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing was updated")
    res.redirect(`/listings/${id}`)
    next()
  }


  module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing =await Listing.findByIdAndDelete(id);
    req.flash("success","listing was delete")
    res.redirect("/listings");
}