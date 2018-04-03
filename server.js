const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Bing = require("node-bing-api")({apiKey:"03b345b6eac047718232317ede3f7bae"});
// require the schema
const search = require("./models/search");
const PORT = process.env.port || 3001;
app.use(express.static('app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(cors());
// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/searches");
app.get("/api/imagesearch/:searchValue*",function(req,res){
    let searchValue = req.params.searchValue;
    let offset = req.query.offset;

    return res.json({searchValue,offset})
});
app.listen(PORT, function () {
    console.log("App is listening on:" + PORT);
})