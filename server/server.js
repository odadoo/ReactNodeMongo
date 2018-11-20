const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./db.js');

var cors = require('cors');
var jsonWebToken = require('jsonwebtoken');

const users = require('./routes/api/users');

const port = process.env.PORT || 5000;

var impObject = {
    'jwtSecret': 'xtytzt00700tytx',
    'connStr': 'mongodb://localhost/AngularCRUD'
};

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('jwtSecret', impObject.jwtSecret);
app.use(cors());

app.use('/api/users', users);

app.listen(port, () => console.log(`Listening on port ${port}`));


// app.post('/api/register', (req, res) => {
//     console.log(req.body);
//     if(req.body.email){
//         var userData = new User(req.body);
//         // var successMsg = "User registered Successfully";
//         userData.email = req.body.email;
//         userData.firstName = req.body.firstName;
//         userData.lastName = req.body.lastName;
//         userData.password = req.body.password;
//         userData.save(function(err, data){
//             if(err){
//                 console.log("Error saving user");
//             }else{
//                 res.send(data);
//                 // res.send({data: "User Registered Successfully"});
//                 // res.send(
//                 //     `User Registered Successfully`,
//                 // );
//             }
//         });
//     }
// });

// app.post('/api/login', (req, res) => {
//     console.log("these are the login credentials", req.body);
//     // var userData = new User(req.body);
//     User.findOne({ 'email': req.body.email }, function (err, user) {
//         console.log("this is the user", user)
//         console.log("this is the err", err)
//         if(err){
//             console.log('Some error occured');
//             throw err;
//         }
//         if(!user){
//             res.json({
//                 authsuccess: false,
//                 description: "User Authentication failed"
//             });
//         } else if (user) {
//             if(user.password != req.body.password) {
//                 res.json({
//                     authsuccess: false,
//                     description: 'User Authentication failed due to wrong password'
//                 });
//             } else {
//                 var accessToken = jsonWebToken.sign(user.toJSON(), app.get('jwtSecret'), {
//                     expiresIn: 3600
//                 });
//                 console.log("Authentication is successfull....");
//                 res.json({
//                     userData: user,
//                     authsuccess: true,
//                     description: "Sending the auth token",
//                     accessToken: accessToken  
//                 })
//             }
//         }
//     });
// });
