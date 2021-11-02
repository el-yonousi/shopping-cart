const Product = require("../model/product");
/**
 * call mongoose
 */
const mongoose = require('mongoose')

/**
 * connect mongoDB
 */
mongoose.connect('mongodb://localhost/shopping-cart', (error) => {
    if (error) {
        console.log('DATABASE ERROR:: ', error);
    } else {
        console.log('DATABASE CONNECTED SUCCESS..');
    }
})

const products = [
    new Product({
        img: "https://images.unsplash.com/photo-1545063328-c8e3faffa16f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Samsung',
        price: 2500,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 48,
            display: 6.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 1',
        price: 1000,
        description: {
            storage: 16,
            sim: 'Single SIM',
            resolution: 8,
            display: 4.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1604054923518-e491a9a6afbb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 2',
        price: 1500,
        description: {
            storage: 32,
            sim: 'Single SIM',
            resolution: 16,
            display: 4.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Sony',
        price: 25000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvbmV8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Huawei',
        price: 15000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 12',
        price: 25000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1606987481980-f8029d617991?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODB8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 12',
        price: 25000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 12',
        price: 25000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
    new Product({
        img: "https://images.unsplash.com/photo-1486432735568-d0cb34dfaadf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHBob25lfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name: 'Iphone 12',
        price: 25000,
        description: {
            storage: 128,
            sim: 'Dual SIM',
            resolution: 64,
            display: 8.5
        }
    }),
]

let done = 0

for (let i = 0; i < products.length; i++) {
    products[i].save((error, result) => {
        if (error) {
            console.log('Product Error:: ', error);
            return
        } else {
            console.log('Results:: ', result);
        }

        done++

        if (done === products.length) {
            mongoose.disconnect()
        }
    });
}