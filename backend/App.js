const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())
const cors = require("cors");
app.use(cors())
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();

const jwt = require("jsonwebtoken")
const JWT_SECRET = "adhvakhq7262bskhfgsgf()kfgsk{}bsjbfj[]gigfw7j"

const MONGO_URL = "mongodb+srv://bipinlongjam:bipin@cluster0.xpexigs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT=5000
// const PORT = process.env.PORT || 5000;

const connectToMongoDB = async () =>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log("Error connecting to MongoDB", error.message)
    }
}
// const mongoUrl = 
// "mongodb+srv://bipinlongjam:bipin@cluster0.xpexigs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// mongoose.connect(mongoUrl,{
//     useNewUrlParser:true
// }).then(() =>{
//     console.log("Connected to database")
// })
// .catch((e)=>console.log(e))

require("./user/userDetails")

const User = mongoose.model("UserInfo")

const Email = require('./sentmails/sentMails')
const unReadmail = require('./unreadmails/unreadMails')

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
   auth: {
     user: "maddison53@ethereal.email",
     pass: "jn7jnAPss4f63QBp6D",
  },
});

app.post("/register", async(req, res)=>{
    const{email, password, confirmPassword} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedConfirmedPassword = await bcrypt.hash(confirmPassword, 10);

    try{
        const oldUser = await User.findOne({email});

        if(oldUser){
            console.log("User Exists");
            return  res.send({error: "User Exists"})
        }
        await User.create({
            email,
            password:encryptedPassword,
            confirmPassword:encryptedConfirmedPassword
        })
        res.send({status:"ok"})
    }catch(error){
        res.send({status:"error"})
    }
})

app.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"User not found"})
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email:user.email}, JWT_SECRET)

        if(res.status(200)){
            return res.json({status:"ok", data:token})
        }else{
            return res.json({error:"error"})
        }
    }
    res.json({status:"error", error:"Invalid Password"})
})

app.post("/userdata", async (req, res)=>{
    const {token} = req.body;

    try{
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok", data: data})
        })
        .catch((error) =>{
            res.send({status:"error", data: error})
        })
    }catch(error){

    }
})

app.post("/sendmail", async(req, res)=>{
    const {to, subject, content, text, html} = req.body;

    try {
        const info = await transporter.sendMail({
          from: ' <bipin@gmail.com>',
          to: to,
          subject: subject,
          content:content,
          text: text,
          html: html,
        });

        console.log("Message sent: %s", info.messageId);
        const email = new Email({
            to: to,
            subject: subject,
            content: content,
          });
          await email.save();
          console.log('Email data saved to MongoDB');
          res.status(200).send({ success: "Email sent successfully", messageId: info.messageId });
      } catch (error) {
        console.error("Error occurred while sending email:", error);
        res.status(500).send({ error: "Error occurred while sending email" });
      }
})

app.post('/sentemails', async(req, res) =>{
    try{
        const sentEmails = await Email.find();
        res.json(sentEmails);
    }catch(error){
        console.log('Error fetching sent emails', error)
        res.status(500).json({error:'Error fteching sent emails'});
    }
})


app.delete('/sentemails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the sent email from MongoDB
    await Email.findByIdAndDelete(id); // Assuming Email is the mongoose model for sent emails
    console.log('Sent email deleted:', id);
    res.sendStatus(204); // Send a 204 No Content response if deletion is successful
  } catch (error) {
    console.error('Error deleting sent email:', error);
    res.status(500).json({ error: 'Error deleting sent email' }); // Send error response if deletion fails
  }
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is Running on port ${PORT}`);
})







