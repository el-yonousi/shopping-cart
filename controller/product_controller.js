const Product = require("../model/product");

const getAllProduct = (req, res, next) => {
    Product.find({}, (error, result) => {
        if (error) {
            console.log('Get All Product Errors:: ', error);
            res.redirect('/product')
            return
        } else {
            console.log('Get All Product Success:: ', result);

            // const grid = []
            // const col = 3
            // for (let i = 0; i < result.length; i += col) {
            //     grid.push(result.slice(i, i + col))
            // }
            // res.render('product', { title: 'Product', products: grid });

            res.render('product', { title: 'Product', products: result });
        }
    }).sort({ _id: -1 }).lean()
}

const deleteProduct = (req, res, next) => {
    Product.deleteMany({}, (error, result) => {
        if (error) {
            console.log(error);
            res.redirect('/product')
        } else {
            console.log(result);
            res.redirect('/')
        }
    })
}

module.exports = {
    getAllProduct: getAllProduct,
    deleteProduct: deleteProduct
}