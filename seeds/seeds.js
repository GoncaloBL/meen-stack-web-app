const colors = require('colors');
//MONGOOSE IMPORT
const mongoose = require('mongoose');
const Product = require('../models/product');
const Review = require('../models/review')
main()
    .then(() => console.log('=> MONGO CONNECTION OPEN!'.green))
    .catch(err => {
        console.log('MONGO CONNECTION ERROR!!!'.red)
        console.log(err)
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ProjectMain');
}



//IMPORT SEED FILES
const cities = require('./cities');
const { descriptors, types } = require('./seedHelpers')


const clearDB = async function () {
    await Product.deleteMany({})
    await Review.deleteMany({})
    console.log('DATABASE CLEARED'.red)
}
clearDB();

const seedDatabase = async () => {
    for (let i = 0; i <= 5; i++) {
        let randomCity = Math.floor(Math.random() * 48);
        let randomDescription = Math.floor(Math.random() * descriptors.length);
        let randomType = Math.floor(Math.random() * types.length);
        let randomPrice = Math.floor(Math.random() * 100) / 100;
        let randomImg = Math.floor(Math.random() * 9) +1;

        let product = new Product({
            title: `${descriptors[randomDescription]} ${types[randomType]}`,
            location: `${cities[randomCity].properties.capital}, ${cities[randomCity].properties.country}`,
            coordinates: cities[randomCity].geometry.coordinates,
            image: //`./seedImages/${randomImg}.jpg`,
            'https://source.unsplash.com/collection/8730916/baked-goods',
            description: 'This is a description',
            price: randomPrice,
            author: '65de6ea79e92a451f9a97ae8', //user1
        })
        await product.save();
    }
    console.log(`SEEDED DATABASE SUCESSFULLY`.green)
}

seedDatabase().then(() => {
    mongoose.connection.close();
    console.log('=> MONGO CONNECTION CLOSED!'.yellow)
});