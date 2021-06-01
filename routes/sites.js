const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const sitesController = require("./../controller/sites");

router.get("/getAll",
    sitesController.getSite);

router.post("/add", 
body('siteName').isString(),
(req, res, next)=>{
    var err = validationResult(req);
    console.log(err.isEmpty())
    console.log("-----------------------");
    if (!err.isEmpty()) {
        res.send(err.mapped())
        // errors encountered
    } else {
        console.log(req.body)
        next()
    }
    
},sitesController.addSite);

module.exports = router;