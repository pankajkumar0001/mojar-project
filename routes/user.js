const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveOringanlUrl } = require("../midelware");
const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})


router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email })
        const newRegister = await User.register(newUser, password);
        req.login(newRegister,(err)=>{
            if(err){
                    return next(err)
            }
            req.flash("success","Welecome to Wenderlust")
        ,    res.redirect("/listings")
        })
        
       
    } catch (e) {
           req.flash("error",e.message)
           res.redirect("/signup",)
    }

}))
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login",saveOringanlUrl,passport.authenticate("local",
{failureRedirect:"/login",
failureFlash:true}),async(req,res)=>{
    req.flash("success","Welcome Back Wenderlust")
    const redirectUrl = res.locals.redirectUrl || ("/listings")
    res.redirect(redirectUrl)
})


router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           next(err)
        }
        req.flash("success","your are logged out");
        res.redirect("/listings")

    })
})





module.exports = router;
