// Requirements for mongoose and schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the model
const searchSchema = new Schema({
    searchValue: String,
    searchDate: Date
}, {timestamp: true});
// Connects model and mongoose connection
const ModelClass = mongoose.model("search", searchSchema);

// export the model
module.exports = ModelClass;