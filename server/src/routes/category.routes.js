const passport = require("passport");

module.exports = app => {
    const categories = require("../controllers/category.controller");

    const router = require('express').Router();

    //create category
    router.post('/', passport.authenticate('jwt', {session: false}), categories.create);

    //get all categories
    router.get('/', categories.findAll);

    //get single category with id
    router.get('/:id', passport.authenticate('jwt', {session: false}), categories.findOne);

    //update category with id
    router.put('/:id', passport.authenticate('jwt', {session: false}), categories.update);

    //delete category with id
    router.delete('/:id', passport.authenticate('jwt', {session: false}), categories.delete);

    //delete all categories
    router.delete('/', passport.authenticate('jwt', {session: false}), categories.deleteAll);

    app.use('/api/categories', router);
}