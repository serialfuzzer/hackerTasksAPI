const e = require("express");
const Checklist = require("./../models/checklist");
const Target = require("./../models/sites");
const checklist = Checklist.checklist;
const list = Checklist.list;
const section = Checklist.section;
const target = Target;
const checklistInstance = Checklist.checklistInstance;
const checklistStatus = Checklist.checklistStatus;


exports.addChecklist = (req, res, next) => {
    const {
        title
    } = req.body;
    const newChecklist = new checklist({
        title: title,
        ownerId: req.user.id,
        privacy: "public"
    })
    newChecklist.save();
    res.status(200).json(newChecklist)

}

exports.getChecklistByChecklistId = async(req, res, next) => {
    const {
        checklistId
    } = req.body;
    console.log(checklistId); // pass
    const owns = await isOwner(req.user.id, checklistId);
    if (owns) {
        const cl = await checklist.findOne({
            _id: checklistId
        });
        res.json(cl)
    } else {
        res.json({
            "error": {
                msg: "Unauthorized"
            }
        });
    }
}


exports.removeChecklist = async(req, res, next) => {
    console.log("CONTROLLER")
    const {
        checklistId
    } = req.body;
    try {
        const clist = await checklist.find({
            _id: checklistId
        });
        if (clist.length > 0) {
            const ownerID = clist[0].ownerId;
            if (ownerID == req.user.id) {
                const cList = await checklist.deleteOne({
                    _id: checklistId
                });
                res.status(200).send({
                    "msg": "Checklist removed"
                });
            } else {
                res.send({
                    "error": {
                        "msg": "Action not allowed"
                    }
                });
            }
        } else {
            res.status(403).json({
                "message": "Checklist not found"
            })
        }
    } catch (err) {
        next(err);
    }
}

exports.addSectionByChecklistId = (req, res, next) => {
    const {
        checklistId,
        title
    } = req.body;
    if (isOwner(req.user.id, checklistId)) {
        const newSection = new section({
            title: title,
            ownerId: req.user.id,
            checklistId: checklistId
        });
        newSection.save();
        res.json(newSection);
    } else {
        res.json({
            "error": {
                msg: "Unauthorized"
            }
        });
    }

}

exports.removeSectionBySectionId = async(req, res, next) => { // I got a call and I got distracted while writing this so this section is incomplete
    const {
        sectionId
    } = req.body;
    const sectn = await section.find({
        _id: sectionId
    });
    if (Object.keys(section).length > 0) {
        const ownerID = sectn[0].ownerId;
        if (ownerID == req.user.id) {
            const removeSectionBySectionId = await section.deleteOne({
                _id: sectionId
            });
            res.status(200).send({
                "msg": "Section removed"
            });
        } else {
            res.send({
                "error": {
                    "msg": "Action not allowed"
                }
            });
        }
    } else {
        res.status(403).json({
            "message": "Checklist not found"
        })
    }

}


exports.getSectionByChecklistId = async(req, res, next) => {
    const {
        checklistId
    } = req.body;
    console.log(checklistId); // pass
    const owns = await isOwner(req.user.id, checklistId);
    if (owns) {
        const cl = await section.find({
            checklistId: checklistId
        });
        res.json(cl)
    } else {
        res.json({
            "error": {
                msg: "Unauthorized"
            }
        });
    }
}


exports.addListBySectionId = (req, res, next) => {
    const {
        listItemText,
        sectionReference
    } = req.body;
    const ownerId = req.user.id;
    if (isOwnerOfSection(req.user._id, sectionReference)) {
        const newList = new list({
            ownerId,
            listItemText,
            sectionReference
        });
        newList.save();
        res.json(newList);
    } else {
        res.status(403).json({
            "message": "Unauthorized"
        })
    }
}


exports.getListBySectionId = async(req, res, next) => {
    const {
        sectionId
    } = req.body;
    console.log(sectionId); // pass
    const owns = await isOwnerOfSection(req.user.id, sectionId);
    if (owns) {
        const sctns = await list.find({
            sectionReference: sectionId
        });
        res.json(sctns)
    } else {
        res.json({
            "error": {
                msg: "Unauthorized"
            }
        });
    }
}


exports.removeListByListId = async(req, res, next) => {
    const {
        listId
    } = req.body;
    const lst = await list.find({
        _id: listId
    });
    if (Object.keys(lst).length > 0) {
        const ownerID = lst[0].ownerId;
        if (ownerID == req.user.id) {
            const removeListByListId = await list.deleteOne({
                _id: listId
            });
            res.status(200).send({
                "msg": "List removed"
            });
        } else {
            res.send({
                "error": {
                    "msg": "Action not allowed"
                }
            });
        }
    } else {
        res.status(403).json({
            "message": "List not found"
        })
    }

}


exports.getFullListByChecklistId = async(req, res, next) => {
    /* 
    Data Representation:
    {
      "checklist": checklistObject,
      "section": [ {section: section1Object, list: [listObjectsForSection1] }, {section: section1Object, list: [listObjectsForSection2] ]
      }
      
      Steps:
      1. Get Checklist ID From the Request body
      2. Search if such checklist exists in the database, if yes continue, if no respond with 403
      3. Make an empty object with the following formation 
      cl = { "checklist": checklistObject, section: [] } 
      4. Find all the sections and store them in an array, section = [sections]
      5. Loop through the section array, find list by sectionId 
      and then cl.list.append({ section: secton, list: listOfTheSection })
      6. Return the object in response
      */
    try {
        var {
            checklistId
        } = req.body;
        var cl = await checklist.find({
            _id: checklistId
        });
        if (cl.length > 0) {
            if (isOwner(req.user.id, checklistId) || cl.privacy == "public") {
                var lst = {
                    "checklist": cl[0],
                    "section": []
                }
                var sections = await section.find({
                    checklistId: checklistId
                });
                for (var i = 0; i < sections.length; i++) {
                    var currentSection = sections[i];
                    var lists = await list.find({
                        sectionReference: currentSection._id
                    });
                    lst.section.push({
                        section: currentSection,
                        list: lists
                    });
                }
                res.json(lst);
            } else {
                res.status(403).json({
                    "message": "Unauthorized"
                });
            }
        } else {
            res.status(403).json({
                "message": "Checklist Not Found"
            });
        }
    } catch {
        res.status(403).json({
            "message": "invalid id"
        })
    }
}


exports.getChecklist = async(req, res, next) => {
    const cList = await checklist.find({
        $or: [{ ownerId: req.user.id }, { privacy: "public" }]
    });
    res.json(cList);
}

exports.makeChecklistInstance = async(req, res, next) => {
    const {
        checklistId,
        targetId
    } = req.body;
    const ownsTheChecklist = await isOwner(req.user.id, checklistId);
    const isTheChecklistPublic = await isChecklistPublic(checklistId);
    console.log(`Is the checklist public?: ${isTheChecklistPublic}`)
    const ownsTheTarget = await isOwnerOfTarget(targetId, req.user.id);
    if ((ownsTheChecklist || isTheChecklistPublic) && ownsTheTarget) {
        const removeInstanceByTargetId = await checklistInstance.remove({
            targetId: targetId
        });
        const newChecklistInstance = new checklistInstance({
            checklistId: checklistId,
            ownerId: req.user.id,
            targetId: targetId
        });
        newChecklistInstance.save();
        res.json(newChecklistInstance);
    } else {
        res.json({
            "error": {
                "msg": "Unauthorized"
            }
        })
    }

}

exports.getChecklistInstance = async(req, res, next) => {
    const cListInstance = await checklistInstance.find({
        ownerId: req.user.id
    });
    res.json(cListInstance);
}

exports.getChecklistStatus = async(req, res, next) => {

    } //working

exports.markChecklistStatus = async(req, res, next) => {

}

exports.unmarkChecklistStatus = async(req, res, next) => {

}




// check if the requesting user owns the checklist
async function isOwner(userId, checklistId) {
    try {
        const checklistOwner = await checklist.findOne({
            _id: checklistId
        });
        const ownerId = checklistOwner.ownerId;
        if (userId == ownerId) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false
    }
}

// check if a checklist is public
async function isChecklistPublic(checklistId) {
    try {
        const cl = await checklist.findOne({
            _id: checklistId
        });
        if (cl.privacy == "public") {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
        return false
    }
}


// check if the requesting user owns the section
async function isOwnerOfSection(userId, sectionId) {
    try {
        const sctn = await section.findOne({
            _id: sectionId
        });
        const ownerID = sctn.ownerId;
        if (ownerID != undefined) {
            if (userId == ownerID) {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

// check if the requesting user owns the list
async function isOwnerOfList(userId, listId) {
    try {
        const lst = await list.findOne({
            _id: listId
        });
        const ownerID = lst.ownerId;
        if (ownerID != undefined) {
            if (userId == ownerID) {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch {
        return false;
    }
}


// check if the requesting user owns the target

async function isOwnerOfTarget(targetId, userId) {
    try {
        const trgt = await target.findOne({
            _id: targetId
        });
        const ownerID = trgt.ownerId;
        if (ownerID != undefined) {
            if (userId == ownerID) {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch {
        return false;
    }
}


/* 
Required features:
  
Add checklist, getChecklistByChecklistId, remove checklist
Add section by checklist id, remove section by checklist id
Add list by section id, remove list by section id
  
*/