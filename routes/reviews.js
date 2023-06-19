const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

// Reviews Route
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete Reviews
router.delete('/:reviewId', isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;

