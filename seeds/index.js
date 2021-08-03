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


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random128 = Math.floor(Math.random() * 128);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '61077bcf542cb4290808a035',
            location: `${cities[random128].city}, ${cities[random128].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random128].longitude,
                    cities[random128].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/teapoteapoteapot/image/upload/v1627881264/YelpCamp/1_xnils5.jpg',
                    filename: 'YelpCamp/1_xnils5'
                },
                {
                    url: 'https://res.cloudinary.com/teapoteapoteapot/image/upload/v1627881264/YelpCamp/2_qpu6am.jpg',
                    filename: 'YelpCamp/2_qpu6am'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})