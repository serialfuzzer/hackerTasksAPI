const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const projectSchema = new Schema({
    projectName: {type: String, required: true},
    ownerId: {type: ObjectId, required: true}
})



module.exports = mongoose.model('project', projectSchema);