module.exports = app => {
    const categories = require("../controllers/category.controller");

    const router = require('express').Router();

    //create category
    router.post('/', categories.create);

    //get all categories
    router.get('/', categories.findAll);

    //get single category with id
    router.get('/:id', categories.findOne);

    //update category with id
    router.put('/:id', categories.update);

    //delete category with id
    router.delete('/:id', categories.delete);

    //delete all categories
    router.delete('/', categories.deleteAll);

    app.use('/api/categories', router);
}