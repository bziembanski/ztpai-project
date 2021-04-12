module.exports = app => {
    const announcements = require("../controllers/announcement.controller");

    const router = require('express').Router();

    //create announcement
    router.post('post', announcements.create);

    //get all announcements with phrase in title or description
    router.get('/searchPhrase', announcements.findAll);

    //get single announcement with id
    router.get('/:id', announcements.findOne);

    //update announcement with id
    router.put('/:id', announcements.update);

    //delete announcement with id
    router.delete('/:id', announcements.delete);

    //delete all announcements
    router.delete('/', announcements.deleteAll);

    app.use('/api/users', router);
}