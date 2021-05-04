module.exports = app => {
    const users = require("../controllers/user.controller");
    const security = require("../controllers/security.controller");

    const router = require('express').Router();

    //create user
    router.post('/', users.create);

    //get all users
    router.get('/', users.findAll);

    router.get('/login', security.login);

    //get single user with id, username or email
    router.get('/:searchPhrase', users.findOne);

    //update user with id
    router.put('/:id', users.update);

    //delete user with id
    router.delete('/:id', users.delete);

    //delete all users
    router.delete('/', users.deleteAll);

    app.use('/api/users', router);

}