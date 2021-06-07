const db = require("../models");
const Category = db.categories;

exports.create = (req, res) => {
    const message = [];
    if (!req.body.name) {
        message.push("Category name cannot be empty!");
    }
    if (message.length > 0) {
        res.status(400).send({
            message: message
        });
        return;
    }
    const category = {
        name: req.body.name
    };
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                messages: [err.message, 'Error occurred while creating Category!']
            });
        });
};

exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while fetching Categories!']
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while searching for Category with id=${id}!`]
            });
        });

};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: {id: id}
    })
        .then(result => {
            if (result[0] === 1) {
                res.send({
                    message: ["Category was updated successfully"]
                });
            } else {
                res.send({
                    message: [`Cannot update Category with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while updating Category with id=${id}!`]
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: {id: id}
    })
        .then(result => {
            if (result === 1) {
                res.send({
                    message: ["Category was deleted successfully"]
                });
            } else {
                res.send({
                    message: [`Cannot delete Category with id=${id}.`]
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, `Error occurred while deleting Category with id=${id}!`]
            });
        });
};

exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
    })
        .then(result => {
            res.send({message: [`${result} Categories were deleted successfully!`]});
        })
        .catch(err => {
            res.status(500).send({
                message: [err.message, 'Error occurred while deleting all Categories!']
            });
        });
};