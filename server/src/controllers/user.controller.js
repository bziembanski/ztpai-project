const db = require("../models");
const User = db.users;
const Announcement = db.announcements;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const messages = [];
    if(!req.body.username){
        messages.push("Username cannot be empty!");
    }
    if(!req.body.email){
        messages.push("Email cannot be empty!");
    }
    if(!req.body.name){
        messages.push("Name cannot be empty!");
    }
    if(!req.body.surname){
        messages.push("Surname cannot be empty!");
    }
    if(!req.body.password){
        messages.push("Password cannot be empty!");
    }
    if(!req.body.password2){
        messages.push("Repeat password cannot be empty!");
    }
    if(req.body.password!==req.body.password2){
        messages.push("Password must be the same!");
    }
    if(messages.length>0){
        res.status(400).send({
            messages: messages
        });
        return;
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            messages.push(err.message);
            messages.push('Error occurred while creating User!');
            res.status(500).send({
                messages: messages
            });
        });
};

exports.findAll = (req, res) => {
    const searchPhrase = req.query.searchPhrase;
    const condition = searchPhrase ?
        {[Op.or]: [{username:{[Op.iLike]: `%${searchPhrase}%`}}, {email:{[Op.iLike]: `%${searchPhrase}%`}}]} : null;

    User.findAll({
        where: condition,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
           res.status(500).send({
               message: err.message || 'Error occurred while searching for Users!'
           });
        });
};

exports.findOne = (req, res) => {
    const searchPhrase = req.params.searchPhrase;
    const condition = isNaN(searchPhrase) ?
        {[Op.or]: [{username:{[Op.iLike]: `${searchPhrase}`}}, {email:{[Op.iLike]: `${searchPhrase}`}}]} : null;

    if(condition){
        User.findOne({
            where: condition,
            include:[
                {
                    model: Announcement
                }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error occurred while searching for User ${searchPhrase}!`
                });
            });
    }
    else{
        User.findByPk(searchPhrase,{
            include:[
                {
                    model: Announcement
                }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error occurred while searching for User with id=${searchPhrase}!`
                });
            });
    }
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    message: "User was updated successfully"
                });
            }
            else{
                console.log("delete result" + result);
                res.send({
                    message: `Cannot update User with id=${id}.`
                });
            }
        })
        .catch(err => {
           res.status(500).send({
               message: err.message || `Error occurred while updating User with id=${id}!`
           });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(result => {
            if(result === 1){
                res.send({
                    message: "User was deleted successfully"
                });
            }
            else{
                res.send({
                    message: `Cannot delete User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while deleting User with id=${id}!`
            });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(result => {
            res.send({message: `${result} Users were deleted successfully!`});
        })
        .catch(err => {
           res.status(500).send({
               message: err.message || 'Error occurred while deleting all Users!'
           });
        });
};