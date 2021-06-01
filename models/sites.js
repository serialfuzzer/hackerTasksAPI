const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sitesSchema = new Schema({
    siteName: {type: String, required: true}
    //userId: {type: ObjectId, required: true}, username: {type: String, required: true}
})



module.exports = mongoose.model('sites', sitesSchema);