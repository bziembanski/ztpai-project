const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    const messages = [];
    if(!req.body.username){
        messages.push("Username cannot be empty!");
    }
    if(!req.body.password){
        messages.push("Password cannot be empty!");
    }
    if(messages.length>0){
        res.status(400).send({
            messages: messages
        });
        return;
    }
    console.log(req.body);
    const user = req.body.username;
    const password = req.body.password;
    const condition = {[Op.or]: [{username:{[Op.iLike]: `${user}`}}, {email:{[Op.iLike]: `${user}`}}]};

    User.findOne({
        where: condition
    })
        .then((data) => {
            console.log(data);
            if(data){
                if(User.correctPassword(password, data)){

                }
                else{
                    res.status(401).send({
                        message: "Wrong password!"
                    })
                }
                res.send(data);
            }
            else{
                res.status(401).send({
                    message: "User not found!"
                })
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while logging in User ${user}!`
            })
        });
}