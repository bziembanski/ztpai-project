const db = require("../models");
const UserRatingType = db.user_rating_types;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const message = [];
    if(!req.body.name){
        message.push("UserRatingType name cannot be empty!");
    }
    if(message.length>0){
        res.status(400).send({
            message: message
        });
        return;
    }
    const userRatingType = {
        name: req.body.name
    };
    UserRatingType.create(userRatingType)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while creating UserRatingType!']
            });
        });
};

exports.findAll = (req, res) => {
    UserRatingType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while fetching UserRatingTypes!']
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    UserRatingType.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while searching for UserRatingType with id=${id}!`]
            });
        });

};

exports.update = (req, res) => {
    const id = req.params.id;

    UserRatingType.update(req.body, {
        where: {id: id}
    })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    message: ["UserRatingType was updated successfully"]
                });
            }
            else{
                res.send({
                    message: [`Cannot update UserRatingType with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while updating UserRatingType with id=${id}!`]
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    UserRatingType.destroy({
        where: {id: id}
    })
        .then(result => {
            if(result === 1){
                res.send({
                    message: ["UserRatingType was deleted successfully"]
                });
            }
            else{
                res.send({
                    message: [`Cannot delete UserRatingType with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while deleting UserRatingType with id=${id}!`]
            });
        });
};

exports.deleteAll = (req, res) => {
    UserRatingType.destroy({
        where: {},
        truncate: false
    })
        .then(result => {
            res.send({message: [`${result} UserRatingTypes were deleted successfully!`]});
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while deleting all UserRatingTypes!']
            });
        });
};