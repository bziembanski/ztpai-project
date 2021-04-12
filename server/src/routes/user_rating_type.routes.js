module.exports = app => {
    const userRatingTypes = require("../controllers/user_rating_type.controller");

    const router = require('express').Router();

    //create userRatingType
    router.post('post', userRatingTypes.create);

    //get all userRatingTypes
    router.get('/', userRatingTypes.findAll);

    //get single userRatingType with id
    router.get('/:id', userRatingTypes.findOne);

    //update userRatingType with id
    router.put('/:id', userRatingTypes.update);

    //delete userRatingType with id
    router.delete('/:id', userRatingTypes.delete);

    //delete all userRatingTypes
    router.delete('/', userRatingTypes.deleteAll);

    app.use('/api/userRatingTypes', router);
}