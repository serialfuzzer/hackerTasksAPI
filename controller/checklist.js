const e = require("express");
const Checklist = require("./../models/checklist");
const checklist = Checklist.checklist;
const list = Checklist.list;
const section = Checklist.section;


exports.addChecklist = (req, res, next) => {
    const { title } = req.body;
    const newChecklist = new checklist({ 
      title: title,
      ownerId: req.user.id 
    })
    newChecklist.save();
    res.status(200).json(newChecklist)
}
exports.removeChecklist = async () => {
    const { checklistId } = req.body; 
    try {
      const clist = await checklist.find({_id: checklistId});
      if(Object.keys(clist).length > 0){ 
        const ownerID = clist[0].ownerId;
        console.log(clist);
        console.log(`${ownerID} == ${ req.user.id}`);
        if(ownerID == req.user.id){
          const sites = await checklist.deleteOne({_id: checklistId});
          res.status(200).send({
              "msg": "Site removed"
          });
        }
        res.send({
          "error": {
            "msg": "Action not allowed"
          }
        });
      } else {
        res.status(403).json({
          "message": "Checklist not found"
        })
      }
    }catch(err){
      throw new Error(err);
    }
}
exports.addSectionByChecklistId = () => {}
exports.removeSectionByChecklistId = () => {}
exports.addListBySectionId = () => {}
exports.removeListBySectionId = () => {}
exports.getChecklistByChecklistId = () => {}


/* 
Required features:

Add checklist, getChecklistByChecklistId, remove checklist
Add section by checklist id, remove section by checklist id
Add list by section id, remove list by section id

*/