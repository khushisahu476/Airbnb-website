const express = require("express");
const router = express.Router();

//index - users
 router.get("/", (req ,res)=>{
    res.send("Get for users");
 });

 //show - users

 router.get("/:id",(req,res)=>{
    res.send("Get for users id");
 });

 router.post("/",(req ,res)=>{
    res.send("post for users");
 });

 router.delete("/:id" ,(req ,res)=>{
    res.send("delete for user id");
 });

 module.exports = router;
