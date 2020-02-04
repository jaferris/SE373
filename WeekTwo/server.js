var express = require("express");
var path = require("path");
var hbs = require("hbs");
var app = express();

hbs.registerPartials(__dirname + "/WeekTwo/views/partials");

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname + '/WeekTwo/public')));

app.set('view engine', 'hbs');

app.get('/index', function(req,res){
   res.render('index.hbs', {loremipsum:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet posuere sem, in eleifend odio. Integer erat risus, pretium ut sagittis sed, condimentum suscipit mauris. Proin bibendum blandit ex, at eleifend erat iaculis vel. Quisque sed tincidunt sapien, eu feugiat lectus. Aliquam erat volutpat. Donec ut felis tellus. Integer a egestas nibh, eu tempus ante. Aenean est ante, consectetur sit amet neque at, placerat volutpat elit. Mauris lectus leo, accumsan quis sem ac, cursus dignissim justo. Phasellus a nisi eu quam ultrices laoreet. Ut suscipit mollis fermentum. Nulla pulvinar fermentum libero. Duis aliquet mi orci, eu ultricies quam dictum at."});
});

app.get('/about', function(req,res){
   res.render('about.hbs', {loremipsum:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet posuere sem, in eleifend odio. Integer erat risus, pretium ut sagittis sed, condimentum suscipit mauris. Proin bibendum blandit ex, at eleifend erat iaculis vel. Quisque sed tincidunt sapien, eu feugiat lectus. Aliquam erat volutpat. Donec ut felis tellus. Integer a egestas nibh, eu tempus ante. Aenean est ante, consectetur sit amet neque at, placerat volutpat elit. Mauris lectus leo, accumsan quis sem ac, cursus dignissim justo. Phasellus a nisi eu quam ultrices laoreet. Ut suscipit mollis fermentum. Nulla pulvinar fermentum libero. Duis aliquet mi orci, eu ultricies quam dictum at."});
});

app.get('/form', function(req,res){
   res.render('form.hbs', {junk:"My form page"});
});

//app.post req.body (post data) url data below
app.all('/results', function(req,res){
   res.render('results.hbs', {name:req.body.Name, email:req.body.email, comments:req.body.comments});
});

app.listen(3000, ()=>{console.log("Server running on port 3000")});