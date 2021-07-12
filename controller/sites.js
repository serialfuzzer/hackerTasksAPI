const e = require("express");
const Sites = require("./../models/sites");
const Project = require("../models/projects");


exports.addSite = async(req, res, next) => {
    const { siteName, projectId } = req.body;
    const doesUserOwnTheProject = await ownsTheProject(projectId, req.user.id);
    console.log(`USER ID: ${req.user.id}`)
    console.log(`Owns the project: ${doesUserOwnTheProject}`)
    if (doesUserOwnTheProject) {
        const newSite = new Sites({
            siteName,
            projectId,
            ownerId: req.user.id
        })
        var saved = await newSite.save();
        const sites = await Sites.find({ ownerId: req.user.id });
        res.send(saved);
    } else {
        res.status(403).json({ "error": "Unauthorized" })
    }
}



exports.getSite = async(req, res, next) => {
    const sites = await Sites.find({ ownerId: req.user.id });
    var newSite = [];
    const projects = await Project.find({ ownerId: req.user.id })
    var sitesLength = sites.length;
    var projectLength = projects.length;
    for (var i = 0; i < sitesLength; i++) {
        for (var j = 0; j < projectLength; j++) {
            var siteProjectId = sites[i]["projectId"].toString();
            var projectProjectId = projects[j]["_id"].toString();
            if (siteProjectId == projectProjectId) {
                newSite.push({
                    _id: sites[i]._id.toString(),
                    siteName: sites[i].siteName.toString(),
                    projectId: siteProjectId,
                    ownerId: sites[i]["ownerId"].toString(),
                    projectName: projects[j]["projectName"].toString()
                })
            }

        }
    }
    //console.log(sitesLength)
    //console.log(newSite);
    res.send(newSite);
}

exports.countSites = async(req, res, next) => {
    const sites = await Sites.find({ ownerId: req.user.id });
    var newSite = [];
    const projects = await Project.find({ ownerId: req.user.id })
    var sitesLength = sites.length;
    var projectLength = projects.length;
    for (var i = 0; i < sitesLength; i++) {
        for (var j = 0; j < projectLength; j++) {
            var siteProjectId = sites[i]["projectId"].toString();
            var projectProjectId = projects[j]["_id"].toString();
            if (siteProjectId == projectProjectId) {
                newSite.push({
                    _id: sites[i]._id.toString(),
                    siteName: sites[i].siteName.toString(),
                    projectId: siteProjectId,
                    ownerId: sites[i]["ownerId"].toString(),
                    projectName: projects[j]["projectName"].toString()
                })
            }

        }
    }
    //console.log(sitesLength)
    //console.log(newSite);
    res.send({
        "controller": "sites",
        "count": newSite.length
    });
}


exports.removeSiteByID = async(req, res, next) => {
    const { siteId } = req.body;
    try {
        const site = await Sites.find({ _id: siteId });
        if (Object.keys(site).length > 0) {
            const ownerID = site[0].ownerId;
            console.log(site);
            console.log(`${ownerID} == ${ req.user.id}`);
            if (ownerID == req.user.id) {
                const sites = await Sites.deleteOne({ _id: siteId });
                const updatedSites = await Sites.find({ ownerId: req.user.id });
                res.send(updatedSites);
            } else {
                res.send({
                    "error": {
                        "msg": "Action not allowed"
                    }
                });
            }
        } else {
            res.status(403).json({
                "message": "Site not found"
            })
        }
    } catch (err) {
        throw new Error(err);
    }

}






/* HELPER FUNCTIONS */
async function ownsTheProject(projectId, userId) {
    try {
        const project = await Project.findOne({ _id: projectId });
        const ownerId = project.ownerId;
        if (ownerId != undefined) {
            if (userId == project.ownerId) {
                console.log("matched");
                return true
            } else {
                console.log("unmatched");
                return false
            }
        } else {
            console.log("undefined ownerId");
            return false;
        }

    } catch (err) {
        console.log(err)
        return false;
    }
}