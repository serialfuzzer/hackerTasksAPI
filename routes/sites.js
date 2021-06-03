const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const sitesController = require("./../controller/sites");
const auth = require('./../middleware/auth');

router.get("/get", auth,
    sitesController.getSite);

router.post("/add", auth,
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

router.get("/remove", auth,
    sitesController.removeSiteByID);

module.exports = router;