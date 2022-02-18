// import packages into the app. Express, body-parser, 
//const sql=require("./app/Database/db")
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
const uuid = require('uuid')
app.use(cors()); 
const path = require('path')
const fileUpload=require('express-fileupload')
app.use(fileUpload())
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
const axios = require('axios')
const sendemail = require('./app/Helpers/emailhelper.js');
const dotenv=require('dotenv');

dotenv.config();

const jwtTokenUtils = require('./jwtTokenUtils')
const { verifyToken } = jwtTokenUtils




app.post('/career/new',verifyToken, async(req, res) =>{
    try{
       const emailFrom ="astrapay@astrapolaris.com";
       const emailSubject = req.body.userRole;
       const firstName = req.body.firstName
       const lastName  = req.body.lastName
       const emailTo = req.body.userEmail
       const address = req.body.userAddress
       const emailToCareer = process.env.careeremail
       const role =  req.body.userRole
      
 
       if( firstName && lastName &&  emailTo && address && role && req.files  ){
         const cvfiles= req.files.cv
         if(firstName==="" || lastName===""  || emailTo==="" || address===""  || role==="" || cvfiles==="" ){
            res.status(400).send({  errorMessage:"Incorrect input " });         
         }else{

            const sendEmailCareer = sendemail.careerAdmin(emailFrom, emailToCareer, emailSubject,  firstName, lastName, emailTo, address, role, cvfiles ); 
            const sendEmailUser = sendemail.careerUser(emailFrom, emailTo, emailSubject, role,  firstName ); 
            res.status(200).send({message:"Success "})
         }
       }else{
             res.status(400).send({  errorMessage:"Incorrect input " });         
       }
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error while sending email"}) 

    }


});



const port = process.env.PORT || 6000     

app.listen(port, ()=> console.log(`listening on port ${port}...`));            