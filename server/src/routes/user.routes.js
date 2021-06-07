const passport = require("passport");

module.exports = app => {
    const users = require("../controllers/user.controller");
    const security = require("../controllers/security.controller");

    const router = require('express').Router();

    //create user
    router.post('/', users.create);

    //get all users
    router.get('/', passport.authenticate('jwt', {session: false}), users.findAll);

    router.post('/login', security.login);
    router.post('/logout', security.logout);
    router.post('/isAuthorized', passport.authenticate('jwt', {session: false}), security.isAuthorized);

    //get single user with id, username or email
    router.get('/:searchPhrase', passport.authenticate('jwt', {session: false}), users.findOne);

    //update user with id
    router.put('/:id', passport.authenticate('jwt', {session: false}), users.update);

    //delete user with id
    router.delete('/:id', passport.authenticate('jwt', {session: false}), users.delete);

    //delete all users
    router.delete('/', passport.authenticate('jwt', {session: false}), users.deleteAll);

    app.use('/api/users', router);

}