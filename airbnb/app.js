const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError  = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");



const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
.then(() => {
    console.log("connect to DB");
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
};


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded( { extended : true } ));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);

const sessionOptions = {
    secret :" mysupersecretcode",
    resave : false,
    saveUninitialized : true ,
    cookie :{
        espires : Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 *1000,
        httpOnly : true,
    },
};

app.get("/",(req,res) => {
    res.send("Hi , i am root");
});

app.use(session(sessionOptions));
app.use(flash());



     //configuring Strategy
    // console.log(passport);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash 
app.use((req ,res ,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
 });

app.use("/listings", listingRouter)
app.use("/listings/:id/reviews" , reviewRouter)
app.use("/" , userRouter);


//for all routs
app.all("*",(req ,res, next) =>{
    next(new ExpressError(404 ,"Page not found!"));
});


//error handle
app.use((err , req , res, next) => {
    let {statusCode = 500, message = "Some error ocuurred here!"} = err;
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080,(req,res) => {
    console.log("Server is listening to  port 8080");
});


