const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema({
    listItemType: {type: String, required: true},
    listItemText: {type: String, required: true},
    childListReference: {type: ObjectId, required: true},
    sectionReference: {type: ObjectId, required: true}
})

module.exports = mongoose.model('list', listSchema);


/* 
Checklist => id , title

Section => id, title, list reference, checklist reference

List => id, listItemType(parent || child), listItemText, childList, section reference
*/