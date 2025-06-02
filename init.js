const mongoose =require("mongoose");
const Chat = require("./models/chat");


main()
    .then((res)=>{
        console.log("Db connected successfully");
    })
    .catch(err=>console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

allChats = [
    {
    from:"shree",
    to:"yak",
    msg:"hi yak",
    created_at:new Date()
},
{
    from:"yash",
    to:"shree",
    msg:"hi shree",
    created_at:new Date()
},{
    from:"shree",
    to:"yash",
    msg:"hi yash",
    created_at:new Date()
},{
    from:"alfaiz",
    to:"kartik",
    msg:"hello kartik",
    created_at:new Date()
},{
    from:"alfaiz",
    to:"yash",
    msg:"hello yash",
    created_at:new Date()
}]
Chat.insertMany(allChats);