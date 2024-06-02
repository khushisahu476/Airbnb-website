const express = require("express");
const app = express();
const users  = require("./routes/user.js");
const posts  = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash"); 
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave : false,
    saveUninitialized :true ,
    
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req ,res ,next)=> {
    res.locals.successMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    next();
});

app.get("/register" ,(req ,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error" , "user not registered");
    }else{
        req.flash("success" ,"user registerd successfully!");
    }
   
    res.redirect("/hello");
});

app.get("/hello",(req ,res)=>{
    res.render("page.ejs" ,{name : req.session.name});
})





// app.get("/test",(req ,res)=>{
//     res.send("test successful!");
// })



app.get("/requestcount",(req  ,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    };
    res.send(`you sent a request ${req.session.count} times`);
})












app.listen(3000,()=>{
    console.log("server is listening to 3000");
}); 

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req  ,res)=>{
//     res.cookie("made-in","India" ,{signed:true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req ,res)=>{
//      console.log(req.signedCookies);
//      res.send("verified");
// })


// app.get("/greet",(req ,res)=>{
//     let {name = "anonymous"} = req.params;
//     res.send(`Hi ,i am ${name}`);
    
// })

// app.get("/getCookies", (req ,res) =>{
//     res.cookie("greet", "hello");
//     res.cookie("madein", "namaste");
//     res.send("get  some cookies")
// });

// app.get("/",(req ,res)=>{
//     console.log(req.cookies);
//     console.dir(req.cookies);
//     res.send("Hi, i am root!");
// });

// app.use("/posts", posts);
// app.use("/users", users);
