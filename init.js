const mongoose = require('mongoose');
const Chat = require('./models/chat');



main().then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


Chat.insertMany([
    {
        from: "Alice",
        to: "Bob",
        msg: "Hey Bob, how are you?",
        created_at: new Date()
      },
      {
        from: "Bob",
        to: "Alice",
        msg: "Hi Alice, I'm good. How about you?",
        created_at: new Date()
      },
      {
        from: "Prince",
        to: "Rahul",
        msg: "Doing well! Just wanted to check in.",
        created_at: new Date()
      },
      {
        from: "Ajit",
        to: "Ponam",
        msg: "will you do conversation with me!",
        created_at: new Date()
      }
])