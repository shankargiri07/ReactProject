/* GET request start for Videos*/
var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var connectdb = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

/* GET request for admin */
app.get("/admin",(req, res)=>{
    mongoClient.connect(connectdb).then((clientObject)=>{
        var database = clientObject.db("Reactdb");
        database.collection("admin").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

/* GET request for categories */
app.get("/categories",(req, res)=>{
    mongoClient.connect(connectdb).then((clientObject) => {
        var database = clientObject.db("Reactdb");
        database.collection("categories").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

/* GET request for users */
app.get("/users",(req, res)=>{
    mongoClient.connect(connectdb).then((clientObject)=>{
        var database = clientObject.db("Reactdb");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

/* GET request for videos */
app.get("/videos",(req, res)=>{
    mongoClient.connect(connectdb).then((clientObject)=>{
        var database = clientObject.db("Reactdb");
        database.collection("videos").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

/* GET request for videos id */
app.get("/videos/:id",(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(connectdb).then((clientObject)=>{
        var database = clientObject.db("Reactdb");
        database.collection("videos").find({VideoId:id}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

/* GET request for videos categoryId */
app.get("/getvideos/:cartid",(req, res)=>{
    var id = parseInt(req.params.cartid);
    mongoClient.connect(connectdb).then((clientObject)=>{
        var database = clientObject.db("Reactdb");
        database.collection("videos").find({CategoryId:id}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
})

/* POST request start for Videos*/

/* POST request for addcategory*/
app.post("/addcategory",(req,res)=>{
    var category = {
        CategoryId:parseInt(req.body.CategoryId),
        CategoryName:req.body.CategoryName
    };

    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("categories").insertOne(category).then(()=>{
            console.log("Category Inserted");
            res.redirect("/categories");
            res.end();
        })
    })
});

/* POST request for registeruser*/
app.post("/registeruser",(req, res) => {
    var user = {
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Email:req.body.Email,
        Mobile:req.body.Mobile
    };
    
    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("users").insertOne(user).then(()=>{
            console.log('User Inserted')
            res.redirect("/users");
            res.end();
        })
    })
});

app.post("/addvideos", (req, res) => {
    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Likes: req.body.Likes,
        DisLikes: req.body.DisLikes,
        Views: req.body.Views,
        CategoryId: parseInt(req.body.CategoryId)
    }
    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("videos").insertOne(video).then(() => {
            console.log(`Video Inserted`);
            res.redirect("/videos");
            res.end();
        })
    })
});

/* PUT request start for Videos*/
app.put("/updatevideo/:id", (req, res) => {
    var id = parseInt(req.params.id);

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.DisLikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("videos").updateOne({VideoId:id}, {$set: video}).then(() => {
            console.log("Video Update successfully..");
            res.end();
        })
    })
});

app.put("/passwordupdate/:password", (req, res) => {
    var password = req.params.password;

    var updatePass = {
        Password: req.body.Password,
    }

    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("users").updateOne({Password:password}, {$set: updatePass}).then(() => {
            console.log("Password Update successfully..");
            res.end();
        })
    })
});

/* DELETE request start for Videos*/
app.delete("/deletevideo/:id", (req, res) =>{

    var id = parseInt(req.params.id);
    mongoClient.connect(connectdb).then(clientObject => {
        var database = clientObject.db("Reactdb");
        database.collection("videos").deleteOne({VideoId:id}).then(() => {
            console.log(`Video Deleted`);
            res.end();
        })
    })
})

app.listen(5555);
console.log("server started : http://127.0.0.1:5555")