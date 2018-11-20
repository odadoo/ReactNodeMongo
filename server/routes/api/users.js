const express = require('express');
const router = express.Router();
var jsonWebToken = require('jsonwebtoken');


const User = require('../../models/Users');


const jwt = require('jsonwebtoken');

// if(result) {
//     const JWTToken = jwt.sign({
//         email: user.email,
//         _id: user._id
//     },
//     'secret',
//     {
//         expiresIn: '2h'
//     });
//     return res.status(200).json({
//         success: 'Welcome to the JWT Auth',
//         token: JWTToken
//     });
// }


router.get('/', (req, res) => {
    // User.find()
    //     .then(items => res.json(items))
    User.find({ role: 0}, function (err, user) {
        if(err){
            console.log("these are the users", err);
        } else {
            res.send(user);
        }
    });
});

router.post('/', (req, res) => {
    const userData = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
        role: req.body.role
    });
    // userData.save().then(user => res.json(user));
    userData.save(function(err, data){
        if(err) {
            console.log("Error saving user");
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.delete('/:id', (req, res) => {
    console.log("req", req.body);
    User.findById(req.params.id)
        .then(user => user.remove().then( () => {
            User.find({  role: 0 })
                .then(users => res.json(users))
            // res.json({success: true});
        }))
        .catch( err => {
            res.status(404).json({ success: false }
        )});
});

router.post('/auth', (req, res) => {
    User.findOne({ email: req.body.email}, function( err, user ){
        if(err){
            console.log("error occured in authentication", err);
            throw err;
        } 
        if( !user ) {
            console.log("user does not exist", err);
            res.json({
                authSuccess: false,
                description: "User authentication failed"
            });
        } else if (user){
            if( user.password !== req.body.password){
                res.json({
                    authsuccess: false,
                    description: 'User Authentication failed due to wrong password'
                });
            } else {
                const JWTToken = jwt.sign({
                    email: user.email,
                    _id: user._id
                },
                'secret',
                {
                    expiresIn: '2h'
                });
                res.json({
                    success: 'Welcome to the JWT Auth',
                    token: JWTToken,
                    userData: user,
                    authsuccess: true,
                    description: "Sending the auth token"
                });
                // var accessToken = jsonWebToken.sign(user.toJSON(), app.get('jwtSecret'), {
                //     expiresIn: 3600
                // });
                // console.log("Authentication is successfull....");
                // res.json({
                //     userData: user,
                //     authsuccess: true,
                //     description: "Sending the auth token",
                //     accessToken: accessToken  
                // })
            }
        }
    })
});

module.exports = router;



// router.post('/', (req, res) => {    //api/register
//     console.log("this is the req body ", req.body);
//     if(req.body.email){
//         var userData = new User(req.body);
//         userData.email = req.body.email;
//         userData.firstName = req.body.firstName;
//         userData.lastName = req.body.lastName;
//         userData.password = req.body.password;
//         userData.save(function(err, data){
//             if(err){
//                 console.log("Error saving user");
//             }else{
//                 res.json(data); //res.send(data)
//             }
//         });
//     }
// });

// module.exports = router;

// router.post('/api/login', (req, res) => {
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
