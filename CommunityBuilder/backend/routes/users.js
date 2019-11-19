const router = require('express').Router();
let User = require('../models/user.model');
var jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    User.find()
        .then(users=>res.json(users))
        .catch(err=> res.status(400).json('eroor' + err));

});

router.route('/register').post((req, res) => {
    const surname = req.body.surname;
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({surname, name, username, email, password});

    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/login').post((req, res) => {
    User.findOne({
         username: req.body.username
     })
     .then(user => {
         if(user){
            if(req.body.password == user.password){
                 const payload = {
                     _id: user._id,
                     name: user.name,
                     surname: user.surname,
                     email: user.email,
                     username: user.username
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send("Logined successfully! Here is token: " + token)
            }
            else{
                res.json({error: "User does not exsist" })
            }

         }else{
            res.json({error: "User does not exsist" })
         }})
         .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;

