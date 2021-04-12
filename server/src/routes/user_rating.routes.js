module.exports = app => {
    const userRatings = require("../controllers/user_rating.controller");

    const router = require('express').Router();

    //create userRating
    router.post('/', userRatings.create);

    //get all userRatings
    router.get('/', userRatings.findAll);

    //get single userRating with id
    router.get('/:id', userRatings.findOne);

    //update userRating with id
    router.put('/:id', userRatings.update);

    //delete userRating with id
    router.delete('/:id', userRatings.delete);

    //delete all userRatings
    router.delete('/', userRatings.deleteAll);

    app.use('/api/userRatings', router);
}