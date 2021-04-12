const db = require("../models");
const UserRating = db.user_ratings;
const UserRatingType = db.user_rating_types;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const messages = [];
    if(!req.body.value){
        messages.push("Value cannot be empty!");
    }
    if(!req.body.user_id){
        messages.push("User_id cannot be empty!");
    }
    if(!req.body.user_rating_type_id){
        messages.push("User_rating_type_id cannot be empty!");
    }
    if(messages.length>0){
        res.status(400).send({
            messages: messages
        });
        return;
    }

    const userRating = {
        value: req.body.value,
        user_id: req.body.user_id,
        user_rating_type_id: req.body.user_rating_type_id
    };

    UserRating.create(userRating)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                messages: err.message || 'Error occurred while creating UserRating!'
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? {user_id:{[Op.eq]: `${id}`}} : null;
    UserRating.findAll({
        where: condition,
        attributes: ['user_rating_type.name',[db.sequelize.fn('avg', db.sequelize.col('value')), 'value']],
        group: ['user_rating_type.id'],
        include: [
            {
                model: UserRatingType,
                attributes : ['name']
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error occurred while fetching for Ratings!'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    UserRating.findOne({
        where: {user_rating_type_id: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while searching for Ratings ${id}!`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    UserRating.update(req.body, {
        where: {id: id}
    })
        .then(result => {
            if(result[0] === 1){
                res.send({
                    message: "Rating was updated successfully"
                });
            }
            else{
                res.send({
                    message: `Cannot update Rating with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while updating Rating with id=${id}!`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    UserRating.destroy({
        where: {id: id}
    })
        .then(result => {
            if(result === 1){
                res.send({
                    message: "Rating was deleted successfully"
                });
            }
            else{
                res.send({
                    message: `Cannot delete Rating with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while deleting Rating with id=${id}!`
            });
        });
};

exports.deleteAll = (req, res) => {
    UserRating.destroy({
        where: {},
        truncate: false
    })
        .then(result => {
            res.send({message: `${result} Ratings were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error occurred while deleting all Ratings!'
            });
        });
};