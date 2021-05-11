const db = require("../models");
const Announcement = db.announcements;
const User = db.users;
const Category = db.categories;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.create = (req, res) => {
    const message = [];
    if(!req.body.title){
        message.push("Title cannot be empty!");
    }
    if(!req.body.description){
        message.push("Description cannot be empty!");
    }
    if(!req.body.wage){
        message.push("Wage cannot be empty!");
    }
    if(!req.body.category_id){
        message.push("Category cannot be empty!");
    }
    if(message.length>0){
        res.status(400).send({
            message: message
        });
        return;
    }
    const userId = jwt.decode((req.cookies['jwt'])).id;
    const announcement = {
        title: req.body.title,
        description: req.body.description,
        wage: req.body.wage,
        user_id: userId,
        category_id: req.body.category_id
    }
    Announcement.create(announcement)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            message.push(err.message);
            message.push('Error occurred while creating Announcement!');
            res.status(500).send({
                message: message
            });
        });
};

exports.findAll = (req, res) => {
    const searchPhrase = req.query.searchPhrase;
    const limit = req.query.limit;
    const condition = searchPhrase && isNaN(searchPhrase)
        ?   {[Op.or]: [{title:{[Op.iLike]: `%${searchPhrase}%`}}, {description:{[Op.iLike]: `%${searchPhrase}%`}}]}
        :   typeof searchPhrase !== 'undefined'
            ? {user_id: searchPhrase}
            : null;

    Announcement.findAll({
        limit:limit,
        where: condition,
        include:[
            {
                model: User
            },
            {
                model: Category
            }
        ],
        order:[
            ['createdAt', 'DESC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while fetching for Announcements!']
            });
        });


};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Announcement.findByPk(id, {
        include:[
            {
                model: User
            },
            {
                model: Category
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while searching for Announcement with id=${id}!`]
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Announcement.update(req.body, {
        where: {id: id}
    })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    message: ["Announcement was updated successfully"]
                });
            }
            else{
                res.send({
                    message: [`Cannot update Announcement with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while updating Announcement with id=${id}!`]
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Announcement.destroy({
        where: {id: id}
    })
        .then(result => {
            if(result === 1){
                res.send({
                    message: ["Announcement was deleted successfully"]
                });
            }
            else{
                res.send({
                    message: [`Cannot delete Announcement with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while deleting Announcement with id=${id}!`]
            });
        });

};

exports.deleteAll = (req, res) => {
    Announcement.destroy({
        where: {},
        truncate: false
    })
        .then(result => {
            res.send({
                message: [`${result} Announcements were deleted successfully!`]
            });
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while deleting all Announcements!']
            });
        });
};