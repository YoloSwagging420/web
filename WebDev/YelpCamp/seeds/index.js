const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const prices = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251/800x450',
            descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore deserunt ipsa adipisci quisquam reprehenderit laborum illum qui voluptatibus beatae. Perferendis eveniet omnis dolorum soluta dignissimos, optio eligendi inventore. Delectus.',
            price: prices,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})