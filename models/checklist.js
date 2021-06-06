const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const list = require("./checklistDependencies/list.js");
const section = require("./checklistDependencies/section.js");


const checklistSchema = new Schema({
    title: {type: String, required: true},
    ownerId: {type: ObjectId, required: true}
})

module.exports = { "checklist": mongoose.model('checklist', checklistSchema),
                    "list": list,
                    "section": section
                };

/* 
Checklist => id , title
Section => id, title, list reference, checklist reference
List => id, listItemType, listItemText, childList, section reference
*/
