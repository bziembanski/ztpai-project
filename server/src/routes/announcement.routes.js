const passport = require("passport");

module.exports = app => {
    const announcements = require("../controllers/announcement.controller");

    const router = require('express').Router();

    //create announcement
    router.post('/', passport.authenticate('jwt', {session: false}), announcements.create);

    //get all announcements with phrase in title or description
    router.get('/', announcements.findAll);

    //get single announcement with id
    router.get('/:id', announcements.findOne);

    //update announcement with id
    router.put('/:id', passport.authenticate('jwt', {session: false}), announcements.update);

    //delete announcement with id
    router.delete('/:id', passport.authenticate('jwt', {session: false}), announcements.delete);

    //delete all announcements
    router.delete('/', passport.authenticate('jwt', {session: false}), announcements.deleteAll);

    app.use('/api/announcements', router);
}