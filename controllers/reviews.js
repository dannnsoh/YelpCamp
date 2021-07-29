const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review posted!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
    // Destructure campground id and reviewId from req.params
    const { id, reviewId } = req.params;
    // Find the campground by id and using the pull operator, remove the review with that specific reviewId from the reviews array
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
};