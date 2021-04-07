const db = require("../models");
const Announcement = db.announcements;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {
    const searchPhrase = req.query.searchPhrase;
    const condition = searchPhrase ?
        {[Op.or]: [{title:{[Op.iLike]: `%${searchPhrase}%`}}, {description:{[Op.iLike]: `%${searchPhrase}%`}}]} : null;
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};