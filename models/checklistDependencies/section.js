const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sectionSchema = new Schema({
    title: {type: String, required: true},
    checklistId: {type: ObjectId, required: true},
    ownerId: {type: ObjectId, required: true},
})

module.exports = mongoose.model('section', sectionSchema);

/* 
Checklist => id , title

Section => id, title, list reference, checklist reference

List => id, listItemType, listItemText, childList, section reference
*/