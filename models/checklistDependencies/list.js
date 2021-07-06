const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listSchema = new Schema({
        listItemText: {type: String, required: true},
        sectionReference: {type: ObjectId, required: false},   
        ownerId: {type: ObjectId, required: true}
    })

module.exports = mongoose.model('list', listSchema);


/* 
Checklist => id , title

Section => id, title, list reference, checklist reference

List => id, listItemType(parent || child), listItemText, childList, section reference
*/