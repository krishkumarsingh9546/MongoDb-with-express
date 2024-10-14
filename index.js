const express = require("express");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
app.use(express.urlencoded({extended : true}));

app.set("views" , path.join(__dirname , "views"));
app.set("views engine" , "ejs");

app.methodOverride = require('method-override');
app.use(methodOverride('_method'))

main().then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

app.listen(port , ()=>{
    console.log(`server is listening : ${port}`);
})


app.get("/", async(req, res) => {
     let chats = await Chat.find({});
     res.render("index.ejs", {chats})
})



app.get("/new", (req, res) => {
    res.render("addNewChat.ejs");
})


app.post("/", async(req, res) => {
    let {from , to , msg ,  created_at} = await req.body;
    Chat.insertMany({from: `${from}`, to: `${to}`, msg: `${msg}`, created_at: `${created_at}`});
    res.redirect("/");
})

app.patch("/:id", async(req, res) => {
    let Id = req.params.id;
    let chat = await Chat.findById(Id)
    res.render("editChatMsg.ejs", {chat});
})


app.put("/:id", async(req, res) => {
    let {id} = req.params;
    let {msg} = req.body;
    
     await Chat.findByIdAndUpdate({_id: id} , {msg:`${msg}`});
    res.redirect("/");
})  


app.delete("/:id", async(req, res) => {
    let {id} = req.params;
     await Chat.findByIdAndDelete(id);
     res.redirect("/");
})


// -------------------------------------------------------------





// Chat.findByIdAndDelete('6704ed3b75b7522924703267')
// .then((res) => console.log(res))
// .catch((err) => console.log(err))



