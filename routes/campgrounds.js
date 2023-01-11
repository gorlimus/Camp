const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const CatchAsync = require('../utils/CatchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../utils/Middleware');

router.route('/')
    .get(CatchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, CatchAsync(campgrounds.newPost));

router.get('/new', isLoggedIn, campgrounds.new);

router.route('/:id')
    .get(CatchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, validateCampground, CatchAsync(campgrounds.editPut))
    .delete(isLoggedIn, isAuthor, CatchAsync(campgrounds.destroy));

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsync(campgrounds.edit))
module.exports = router;