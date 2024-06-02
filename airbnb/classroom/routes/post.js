const express = require("express");
const router = express.Router();


//posts
router.get("/:id", (req  ,res)=>{
    res.send("get post");
});

router.get("/",(req ,res)=>{
    res.send("GEt foe posts");
});
//show
router.post("/" ,(req ,res)=>{
    res.send("Post for posts");
});

//delete
router.delete("/:id",(req ,res)=>{
    res.send("deleted post");
});

module.exports = router;