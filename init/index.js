const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlist";
main().then(()=>{
    console.log("Connected to DB");
}).catch(err=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6651e200f2c0396b6f65b23f"}))
    await Listing.insertMany(initData.data); 
    console.log("ok")
}

initDB();