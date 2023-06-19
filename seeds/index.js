const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

// Test Database Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database Connected');
});

// Function to pick random array element
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '62929d26d6381f7fe5e77cb0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus tortor eu tortor scelerisque porttitor. Pellentesque rutrum, elit non blandit varius, eros velit rutrum turpis, eu bibendum est lectus sed metus. Quisque tempus tristique felis at ultrices. Aenean sed enim quis enim eleifend bibendum sit amet eget orci. Aenean euismod sapien quis leo pellentesque, in hendrerit felis sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut sit amet lorem id mi molestie sollicitudin.',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/djuqdlxj3/image/upload/v1653851349/Yelp%20Camp/sh9hrwptu4n0itprrlih.png',
                  filename: 'Yelp Camp/sh9hrwptu4n0itprrlih',
                },
                {
                  url: 'https://res.cloudinary.com/djuqdlxj3/image/upload/v1653851351/Yelp%20Camp/ucp4lryk2kgtvrxcpg5o.jpg',
                  filename: 'Yelp Camp/ucp4lryk2kgtvrxcpg5o',
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

