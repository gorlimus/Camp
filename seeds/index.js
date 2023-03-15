require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors, description } = require("./seedHelper");
const Campground = require("../models/campground");

const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", true);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected");
});

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("DB connected");
// });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const fullTitle = `${sample(descriptors)} ${sample(places)}`;
    const camp = new Campground({
      title: `${fullTitle}`,
      description: `${fullTitle} - ${sample(description)}`,
      price: Math.floor(random1000 / 10),
      images: [
        {
          url: "https://res.cloudinary.com/dyjb0amlp/image/upload/v1674059712/Yelp-Camp/scott-goodwill-y8Ngwq34_Ak-unsplash_xoakbn.jpg",
          filename: "Yelp-Camp/scott-goodwill-y8Ngwq34_Ak-unsplash_xoakbn",
        },
        {
          url: "https://res.cloudinary.com/dyjb0amlp/image/upload/v1674059712/Yelp-Camp/zach-betten-K9olx8OF36A-unsplash_1_qbe2cx.jpg",
          filename: "Yelp-Camp/zach-betten-K9olx8OF36A-unsplash_1_qbe2cx",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      author: process.env.DB_AUTHOR,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
