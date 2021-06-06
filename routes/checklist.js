const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const checklistController = require("./../controller/checklist");
const auth = require('./../middleware/auth');


router.post("/add", auth,
body('title').isString(),
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
    
},checklistController.addChecklist);

module.exports = router;