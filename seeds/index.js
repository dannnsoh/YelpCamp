const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // author is Dan's account's user id so don't delete the user!
            author: '60f9497f0d5ce017e841d135',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi rerum labore voluptates magni. Eligendi doloribus fugiat itaque vel? At sunt accusamus praesentium recusandae, ducimus excepturi dolor! Quis, nihil placeat!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/democloud99/image/upload/v1627452512/YelpCamp/frv4cwfcakagut95edye.jpg',
                    filename: 'YelpCamp/frv4cwfcakagut95edye'
                },
                {
                    url: 'https://res.cloudinary.com/democloud99/image/upload/v1627452512/YelpCamp/gd8d08pjwf7ek2vd07kl.jpg',
                    filename: 'YelpCamp/gd8d08pjwf7ek2vd07kl'
                }
            ]
        });
        await camp.save();
    }
};

seedDb().then(() => {
    db.close();
});