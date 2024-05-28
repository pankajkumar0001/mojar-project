require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlist";
const MongoStore = require('connect-mongo');
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js");


const url= process.env.MONGODB_URL;
main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err)
})
async function main() {
    await mongoose.connect(url);
}
// app.get("/", (req, res) => {
//     res.send("HI am root");
// })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const store= MongoStore.create({
    mongoUrl:url,
    crypto: {
        secret: 'secret'
      },
      touchAfter:24*3600
})
const sessionOption = {
    store,
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}
store.on("err",()=>{
    console.log("error in mongodb session store",err);
})


app.use(session(sessionOption))
app.use(flash());
app.use(passport.initialize())   // a middleware that initializes passport
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    console.log(res.locals.currUser);

    next()
})

app.use("/listings", listingsRouter)
app.use("/listings/:id/reviews", reviewsRouter)
app.use("/",userRouter)



//routers
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found",))
})

app.use((err, req, res, next) => {
    let { statuscode = 500, message = "something went wrong" } = err;
    //    res.status(statuscode).send(message);
    res.status(statuscode).render("error.ejs", { statuscode, message });
})
app.listen(8080, () => {
    console.log("server is listen me")
})



