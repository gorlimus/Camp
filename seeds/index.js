const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/484351',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti nesciunt ratione consectetur modi corporis totam ad, odit quos asperiores molestiae suscipit animi debitis quas repellendus est? Porro, harum iure. Quod.',
            price: random1000 / 10
        });
        await camp.save()
    };
};

seedDB().then(() => {
    mongoose.connection, close();
});