var express = require("express");
var http = require("http");
var fs = require("fs");
var nunjucks = require("nunjucks");
var path = require("path");
var app = express();
var flash = require("express-flash");
var request = require("request");
var sessions = require("express-session");
var bodyParser = require("body-parser");
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch:true
});
app.use(sessions({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }
));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public" ,express.static(path.join(__dirname , "public")));
app.get("/register",function (req , res) {
    res.render("register.html")
});
app.get("/login",function (req , res) {
    res.render("login.html")

});
var baseUrl = "http://localhost:9000/api";
app.post("/user",function (req , res) {
    request.post(baseUrl + "/users",{
            json:true,
            body:{
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
            }
        },function (err, response, body) {
            if (body.status == "success"){
                res.redirect("/login")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.post("/login",function (req , res) {
    request.post(baseUrl + "/login",{
            json:true,
            body:{
                email:req.body.email,
                password:req.body.password
            }
        },function (err, response, body) {
            if (body.status == "success"){
                req.session.user = body.body;
                res.redirect("/")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.use("/", function (req , res ,next) {
    if (req.session.user) {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "accept, cache-control, content-type, x-requested-with, token");
        app.locals.user = req.session.user;
        next()
    }
    else res.redirect("/login")
});
app.get("/",function (req, res) {
    res.render("home.html")
});


app.get("/passenger/list",function (req, res) {
    res.render("passengers/list.html")
});
app.get("/passenger/create", function (req, res) {
    res.render("passengers/create.html")
});
app.get("/passenger/edit/:id", function (req, res) {
    res.render("passengers/edit.html")
});

app.get("/plane/list", function (req, res) {
    res.render("planes/list.html")
});
app.get("/schedule/list", function (req, res) {
    res.render("schedules/list.html")
});
app.get("/schedule/create", function (req, res) {
    res.render("schedules/create.html")
});
app.get("/tickets/list", function (req, res) {
    res.render("tickets/list.html")
});
app.get("/tickets/create", function (req, res) {
    res.render("tickets/create.html")
});
app.get("/plane/create", function (req, res) {
    res.render("planes/create.html")
});
app.post("/passenger/create", function (req, res) {
    request.post(baseUrl + "/passengers",{
            headers:{
                token:req.session.user.token
            },
            json:true,
            body:{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                pasphone: parseInt(req.body.pasphone)
            }
        },function (err, response, body) {
            if (body.status == "success"){
                res.redirect("/passenger/list")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.post("/plane/create", function (req, res) {
    request.post(baseUrl + "/planes",{
            headers:{
                token:req.session.user.token
            },
            json:true,
            body:{
                name:req.body.name,
                capacity:req.body.capacity,
                type: req.body.type
            }
        },function (err, response, body) {
            if (body.status == "success"){
                res.redirect("/plane/list")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.post("/tickets/create", function (req, res) {
    request.post(baseUrl + "/tickets",{
            headers:{
                token:req.session.user.token
            },
            json:true,
            body:{
                type:req.body.type,
                price:parseInt(req.body.price)
            }
        },function (err, response, body) {
            if (body.status == "success"){
                res.redirect("/tickets/list")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.post("/schedule/create", function (req, res) {
    request.post(baseUrl + "/schedules",{
            headers:{
                token:req.session.user.token
            },
            json:true,
            body:{
                startdate:req.body.startdate,
                enddate:req.body.enddate,
                destination: req.body.destination
            }
        },function (err, response, body) {
            if (body.status == "success"){
                res.redirect("/schedule/list")
            }else {
                req.flash("error", body.body);
                res.redirect("back")
            }
        }
    )
});
app.get("/config.js" ,function (req, res) {
    var src = "var User = " + JSON.stringify(req.session.user);
    res.send(src);
});
app.listen(80 , function () {
    console.log("your application runing On 80 port")
});

