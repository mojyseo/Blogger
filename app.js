//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing .";
const aboutContent =
  "This is a simple blog that allows you to write something on the wall and it will always stays there!";
const contactContent = `You can email me! my email adadress: mojyseo@gmail.com`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [
  {
    title: "Title",
    content:
      "lorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem  orem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem torem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem torem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem torem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem torem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem tiptulorem ipsum murem lorem ipsum murem tiptulorem ipsum murem ttiptutiptu",
  },
];
app.set("view engine", "ejs");
console.log(posts);

app.get("/posts/:topic", (req, res) => {
  const par = lodash.kebabCase(req.params.topic);

  posts.forEach(function (post) {
    const pos = lodash.kebabCase(post.title);
    if (pos === par) {
      res.render("post", { post: post });
      console.log("match found!  post:" + par);
    }
  });
});
console.log(lodash.lowerCase(""));

app.get("/", (req, res) => {
  res.render("home", {
    stringcontent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { stringcontent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { stringcontent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  var post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});
app.listen(5000, function () {
  console.log("server started on port 5000!");
});
