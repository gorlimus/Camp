const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const CatchAsync = require('../utils/CatchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../utils/Middleware');

router.post('/', isLoggedIn, validateReview, CatchAsync(reviews.newPost));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, CatchAsync(reviews.destroy));

module.exports = router;