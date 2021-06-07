const passport = require("passport");

module.exports = app => {
    const userRatings = require("../controllers/user_rating.controller");

    const router = require('express').Router();

    //create userRating
    router.post('/', passport.authenticate('jwt', {session: false}), userRatings.create);

    //get all userRatings
    router.get('/', passport.authenticate('jwt', {session: false}), userRatings.findAll);

    //get single userRating with id
    router.get('/:id', passport.authenticate('jwt', {session: false}), userRatings.findOne);

    //update userRating with id
    router.put('/:id', passport.authenticate('jwt', {session: false}), userRatings.update);

    //delete userRating with id
    router.delete('/:id', passport.authenticate('jwt', {session: false}), userRatings.delete);

    //delete all userRatings
    router.delete('/', passport.authenticate('jwt', {session: false}), userRatings.deleteAll);

    app.use('/api/userRatings', router);
}