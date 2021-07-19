const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const list = require("./checklistDependencies/list.js");
const section = require("./checklistDependencies/section.js");


const checklistSchema = new Schema({
    title: { type: String, required: true },
    ownerId: { type: ObjectId, required: true },
    privacy: { type: String, required: true } // public or private
})

const checklistInstanceSchema = new Schema({
    checklistId: { type: ObjectId, required: true },
    ownerId: { type: ObjectId, required: true },
    targetId: { type: ObjectId, required: true }
})

const checklistStatusSchema = new Schema({
    checklistId: { type: ObjectId, required: true },
    list: { type: ObjectId, required: true },
    ownerId: { type: ObjectId, required: true },
    checked: { type: Boolean, required: true }
})

module.exports = {
    "checklist": mongoose.model('checklist', checklistSchema),
    "checklistInstance": mongoose.model('checklistInstance', checklistInstanceSchema),
    "checklistStatus": mongoose.model('checklistStatus', checklistStatusSchema),
    "list": list,
    "section": section
};

/* 
Checklist => id , title
Section => id, title, list reference, checklist reference
List => id, listItemType, listItemText, childList, section reference
*/