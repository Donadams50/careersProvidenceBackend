const nodemailer = require("nodemailer"); 
const hbs = require('nodemailer-express-handlebars')

const dotenv=require('dotenv');

dotenv.config();




exports.careerAdmin = async (emailFrom, emailToCareer, emailSubject,  firstName, lastName, userEmail, userAddress, role, cvfiles) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        name: process.env.mailName,
        host: process.env.host,
        port: 465,
        secure: true,
        ignoreTLS: true,
        
    auth: {
        // should be replaced with real sender's account
          user: process.env.user,
          pass:  process.env.pass         
    },
   
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'careerAdmin.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/Helpers/careerAdmin'
  },
  viewPath:'./app/Helpers',
  extName:'.handlebars',

};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailToCareer,         
        subject: emailSubject,
        text: emailSubject,
        template: 'careerAdmin',
        context: {
            firstName: firstName,
            lastName: lastName,
            userEmail: userEmail,
            userAddress: userAddress,
            role: role

        },

        attachments: [
           
            // Binary Buffer attachment
            {
                filename: cvfiles.name,
                content: Buffer.from(cvfiles.data,
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            },

        ]
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('=======================================fail======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
   console.log('=======================================success======================')
     console.log('Email sent: ' + info.messageId);    
       resolve(true);
    }
   });
 
   })
}
   

} 

exports.careerUser = async (emailFrom, emailTo, emailSubject, role,  firstName) =>{
   
    let resp= await wrapedSendMail();
     return resp;

async function wrapedSendMail(){
    return new Promise((resolve,reject)=>{
    let transport = nodemailer.createTransport({
        name: process.env.mailName,
        host: process.env.host,
        port: 465,
        secure: true,
        ignoreTLS: true,
        
    auth: {
        // should be replaced with real sender's account
          user: process.env.user,
          pass:  process.env.pass         
    },
   
    });
const handlebarsOptions= {
  viewEngine:{
      extName:'careerUser.handlebars',
      partialsDir: './',
      layoutsDir: './',
      defaultLayout:'./app/Helpers/careerUser'
  },
  viewPath:'./app/Helpers',
  extName:'.handlebars',

};
    transport.use('compile', hbs(handlebarsOptions));
    const mailOptions = {
        // should be replaced with real  recipient's account 
        from: emailFrom,
        to: emailTo,         
        subject: emailSubject,
        text: emailSubject,
        template: 'careerUser',
        context: {
            firstName: firstName,
            role: role

        }
    }; 


 let resp=false;
 transport.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('=======================================fail======================')
        console.log("error is "+error);
       reject(false); // or use rejcet(false) but then you will have to handle errors
       //return error
    } 
   else {
      
   console.log('=======================================success======================')
     console.log('Email sent: ' + info.messageId);    
       resolve(true);
    }
   });
 
   })
}
   

} 

