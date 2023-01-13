const Campground = require('../models/Campground');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
};

module.exports.new = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.newPost = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.show = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' }
        })
        .populate('author');

    if (!campground) {
        req.flash('error', "Cannot find this campground");
        return res.redirect('/campgrounds');
    };
    console.log(campground)
    res.render('campgrounds/show', { campground });

};

module.exports.edit = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', "Cannot find this campground");
        return res.redirect('/campgrounds');
    };
    res.render(`campgrounds/edit`, { campground });
};

module.exports.editPut = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', "Successfully updated a campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.destroy = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
};