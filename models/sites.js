const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sitesSchema = new Schema({
    siteName: {type: String, required: true},
    ownerId: {type: ObjectId, required: true},
    projectId: {type: ObjectId, required: true}
})



module.exports = mongoose.model('sites', sitesSchema);