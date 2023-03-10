const Campground = require('../models/campground');
const Review = require('../models/Review');

module.exports.newPost = async (req, res,) => {
    const campground = await Campground.findById(req.params.id);//acces to campground from url
    const review = new Review(req.body.review); //it's connected with name in the form
    review.author = req.user._id;
    campground.reviews.push(review);//add review to campground model to field 'reviews'
    await review.save();//save changes in DB
    await campground.save();//save changes in DB
    req.flash('success', "Created a new review!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.destroy = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', "Deleted review!");
    res.redirect(`/campgrounds/${req.params.id}`);
};