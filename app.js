const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DB connected");
});
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/newcampground', async (req, res) => {
    const camp = new Campground({ title: 'My backyard' });
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})