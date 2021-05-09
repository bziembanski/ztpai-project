const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    const message = [];
    if(!req.body.username){
        message.push("Username cannot be empty!");
    }
    if(!req.body.password){
        message.push("Password cannot be empty!");
    }
    if(message.length>0){
        res.status(400).send({
            message: message
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
            if(data){
                if(User.correctPassword(password, data)){
                    const token = jwt.sign({
                        username: data.username,
                        avatar: data.avatar,
                        id: data.id,
                        expiration: Date.now() + parseInt(process.env.TOKEN_EXPIRE)
                    }, process.env.TOKEN_SECRET);

                    res.cookie('jwt',
                        token, {
                            httpOnly: true,
                            secure:false
                        }
                    ).status(200).send(data);
                }
                else{
                    res.status(401).send({
                        accessToken: null,
                        message: "Wrong password!"
                    })
                }
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
};
exports.logout = (req, res) => {
    if(req.cookies['jwt']){
        res
            .clearCookie('jwt')
            .status(200)
    }
    else{
        res.status(401).send({
            message: "Invalid jwt"
        });
    }
};