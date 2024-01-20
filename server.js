const express = require("express")
const app = express();
const  bodyparser = require("body-parser")
const bcrypt = require("bcrypt");
const passport = require("passport");
const expressSession = require("express-session");

//! Database
const mongoose = require("mongoose");



async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ott');
        console.log("Connected to database");
    } catch (error) {
        console.error("Error:", error);
    }
}


main()
const { initializePassport,isAuthenticated } = require("./passport-config");
initializePassport(passport);

const User = require("./database.js");




app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(passport.initialize());
app.use(expressSession({secret:"secret", resave:false, saveUninitialized:false}))
app.use(passport.session());
app.use(express.static('public'))


app.set("view engine", "ejs")

app.get("/", (req,res)=>{
  res.render("index.ejs")
})
app.get("/login", (req,res)=>{
    res.render("login.ejs");
})
app.post("/login", passport.authenticate("local", {failureRedirect:"/register", successRedirect:"/movies"}), (req,res)=>{

})
app.get("/register", (req,res)=>{
    res.render("register.ejs");
})
app.post("/register", async (req, res) => {
    
       const user = await User.findOne({username:req.body.username});
       if(user){
        return res.status(404).send("User already exists");
       }
       else{
        const newuser = await User.create(req.body)
        res.status(201).send(newuser)
        res.redirect("/login")
       }
    
    
});
app.get("/movies",isAuthenticated, (req,res)=>{
   res.render("watch.ejs");
})


app.listen(3000);