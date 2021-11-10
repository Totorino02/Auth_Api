const router = require("express").Router();
const mongoose = require("mongoose");
const verify = require("../middlewares/authToken");

router.get("/post",verify, (req, res)=>{
    res.status(200).json({
        name : "totorino",
        description: "5 cassiers de bibine"
    });
})


module.exports = router;