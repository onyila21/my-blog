//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const historyContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-onyeka:kach456@cluster0.5rgw8po.mongodb.net/blogDB", {useNewUrlParser: true});

// a post shema helps to save a composed post to database
const postSchema = {
  title: String,
  content: String
};

// a new mongodb model defines post collections
const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

// to display posts you created in home page
  Post.find({}, function(err, posts){
    res.render("home", {
      // startingContent: homeStartingContent,
      // css: 'css',
      homeHref: './',
      aboutHref: './about',
      contactHref: './contact',
      historyHref: './history',
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

//Inside the app.post() method for your /compose route, you’ll need to create
//a new post document using your mongoose model to save posts in database

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

//a callback to the save method to only redirect to the home page once save is complete with no errors
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
// it was changed from postName to postId in order to render the coorect post when u click on read more
const requestedPostId = req.params.postId; // constant that stores the post id parameter


//Once a matching post is found, you can render its title and content in the post.ejs page.
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});
//
// app.get("/contact", function(req, res){
//   res.render("contact", {contactContent: contactContent});
// });
app.get('/contact', (req, res) => {
    res.render('contact', {
        // css: 'css',
        homeHref: './',
        aboutHref: './about',
        contactHref: './contact'
    });
});


app.get("/history", function(req, res){
  res.render("history", {historyContent: historyContent});
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port: 3000!");
});

//
// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });

// <!-- <h1>Home</h1>
// <p> <%= startingContent %> </p> -->
