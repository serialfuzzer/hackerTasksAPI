const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const projectController = require("./../controller/project");
const auth = require('./../middleware/auth');

router.get("/get", auth,
    projectController.getProject);

router.post("/add", auth,
    body('projectName').isString(),
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

    }, projectController.addProject);

router.post("/remove", auth, projectController.removeProjectById);

router.get("/count", auth, projectController.countProjects);

module.exports = router;