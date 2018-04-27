const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Bing = require("node-bing-api")({"subscriptionKey": "9ed7af2b1b8944e78ecdb9964b0f2354"});
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

// Get All search terms from the database
app.get("/api/recentsearches",function(req,res){
    search.find({},function(error,data){
        res.json(data);
    });
});
// Get call with required and not required params to do a search
app.get("/api/imagesearch/:searchValue*", function (req, res) {
    let searchValue = req.params.searchValue;
    let offset = req.query.offset;
    let data = new search({searchValue, searchDate: new Date()});
    data.save(function (error) {
        if (error) {
            res.send("Error saving to database")
        }
      Bing.images(searchValue,{
          top:10
      },function(error,response,body){
        res.json(body);
      });
    });
    
});


app.listen(PORT, function () {
    console.log("App is listening on:" + PORT);
})