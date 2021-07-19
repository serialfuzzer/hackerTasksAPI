const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const checklist = require('../models/checklist');
const checklistController = require("./../controller/checklist");
const auth = require('./../middleware/auth');


router.post("/add", auth,
    body('title').isString(),
    (req, res, next) => {
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

    }, checklistController.addChecklist);


router.post("/removeChecklist", auth, checklistController.removeChecklist);

router.post("/getChecklistByChecklistId", auth, checklistController.getChecklistByChecklistId); // add validation routes

router.post("/addSectionByChecklistId", auth, checklistController.addSectionByChecklistId);

router.post("/removeSectionBySectionId", auth, checklistController.removeSectionBySectionId);

router.post("/getSectionByChecklistId", auth, checklistController.getSectionByChecklistId);

router.post("/addListBySectionId", auth, checklistController.addListBySectionId);

router.post("/getListBySectionId", auth, checklistController.getListBySectionId);

router.post("/removeListByListId", auth, checklistController.removeListByListId);

router.post("/getFullListByChecklistId", auth, checklistController.getFullListByChecklistId);

router.get("/getAllChecklist", auth, checklistController.getChecklist);

router.post("/makeChecklistInstance", auth, checklistController.makeChecklistInstance);

router.get("/getChecklistInstance", auth, checklistController.getChecklistInstance);


module.exports = router;