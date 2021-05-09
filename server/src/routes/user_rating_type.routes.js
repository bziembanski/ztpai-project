const passport = require("passport");
module.exports = app => {
    const userRatingTypes = require("../controllers/user_rating_type.controller");

    const router = require('express').Router();

    //create userRatingType
    router.post('/', passport.authenticate('jwt', {session: false}), userRatingTypes.create);

    //get all userRatingTypes
    router.get('/', passport.authenticate('jwt', {session: false}), userRatingTypes.findAll);

    //get single userRatingType with id
    router.get('/:id', passport.authenticate('jwt', {session: false}), userRatingTypes.findOne);

    //update userRatingType with id
    router.put('/:id', passport.authenticate('jwt', {session: false}), userRatingTypes.update);

    //delete userRatingType with id
    router.delete('/:id', passport.authenticate('jwt', {session: false}), userRatingTypes.delete);

    //delete all userRatingTypes
    router.delete('/', passport.authenticate('jwt', {session: false}), userRatingTypes.deleteAll);

    app.use('/api/userRatingTypes', router);
}