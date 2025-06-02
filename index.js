const express = require("express");
const mongoose =require("mongoose");
const path = require("path");
const ejs = require("ejs");
const Chat = require("./models/chat");
const methodOverride = require("method-override");


const app=express();

app.use(methodOverride('_method'));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));



main()
    .then((res)=>{
        console.log("Db connected successfully");
    })
    .catch(err=>console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



let chat1= new Chat({
    from:"shree",
    to:"yak",
    msg:"hi",
    created_at:new Date()
})
chat1.save().then((res)=>{
    console.log(res);
})


//New Route
app.get("/chats/new",async(req,res)=>{
    res.render("new.ejs");
})

//Create Route
app.post("/chats",(req,res)=>{
    let { from, to , msg} =req.body;
    let newChat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then((res)=>{
        console.log("chat was saved");
    }).catch(err=>console.log(err));
    res.redirect("/chats");
})

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        { runValidators:true, new :true} 
        
    );
    console.log(updatedChat);
    res.redirect("/chats");
})

//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//Delete Route
app.delete("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    let deltedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

//Index Route
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//Home Route
app.get("/",(req,res)=>{
    res.render("home.ejs");
})

const port =8080;
app.listen(port,() =>{
    console.log(`the server is running on port ${port} `);
})

