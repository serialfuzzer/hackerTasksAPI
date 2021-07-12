const e = require("express");
const Project = require("./../models/projects");


exports.addProject = async(req, res, next) => {
    const { projectName } = req.body;
    const newProject = new Project({
        projectName: projectName,
        ownerId: req.user.id
    })
    var saved = await newProject.save();
    const projects = await Project.find({ ownerId: req.user.id });
    res.send(projects);
}

exports.getProject = async(req, res, next) => {
    const project = await Project.find({ ownerId: req.user.id });
    res.send(project);
}

exports.removeProjectById = async(req, res, next) => {
    const { projectId } = req.body;
    try {
        const project = await Project.find({ _id: projectId });
        if (Object.keys(project).length > 0) {
            const ownerID = project[0].ownerId;
            console.log(project);
            if (ownerID == req.user.id) {
                const deletedProject = await Project.deleteOne({ _id: projectId });
                const updatedProjects = await Project.find({ ownerId: req.user.id });
                res.send(updatedProjects);
            } else {
                res.send({
                    "error": {
                        "msg": "Action not allowed"
                    }
                });
            }
        } else {
            res.status(403).json({
                "message": "Project not found"
            })
        }
    } catch (err) {
        throw new Error(err);
    }

}

exports.countProjects = async(req, res, next) => {
    const project = await Project.find({ ownerId: req.user.id });
    res.send({
        "module": "project",
        "count": project.length
    });
}