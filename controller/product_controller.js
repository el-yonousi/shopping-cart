const Product = require("../model/product");

const getAllProduct = (req, res, next) => {
    let email = ''
    if (req.isAuthenticated()) {
        email = req.user.email
    }
    Product.find({}, (error, result) => {
        if (error) {
            console.log('Get All Product Errors:: ', error);
            res.redirect('/')
            return
        } else {
            // console.log('Get All Product Success:: ', result);

            // const grid = []
            // const col = 3
            // for (let i = 0; i < result.length; i += col) {
            //     grid.push(result.slice(i, i + col))
            // }
            // res.render('product', { title: 'Product', products: grid });
            res.render('product/products', {
                title: 'Product',
                products: result,
                checkAuthUser: req.isAuthenticated(),
                user: {
                    email: email
                },
            });
        }
    }).sort({ _id: -1 }).lean()
}

const deleteProducts = (req, res, next) => {
    Product.deleteMany({}, (error, result) => {
        if (error) {
            console.log(error);
            res.redirect('/')
            return
        }

        // console.log(result);
        res.redirect('/')
    })
}

const showProduct = (req, res, next) => {
    let email = ''
    if (req.isAuthenticated()) {
        email = req.user.email
    }
    Product.find({ _id: req.params.product }, (err, product) => {
        res.render('product/product', {
            product: product,
            checkAuthUser: req.isAuthenticated(),
            user: {
                email: email
            },
        })
    }).lean()
}

const deleteProduct = (req, res, next) => {
    try {
        Product.deleteOne({ _id: req.params.product }, (err, product) => {
            if (err) {
                console.log(err);
                res.redirect('/' + req.params.product)
                return
            }
            res.redirect('/')
            return
        })
    } catch (error) {
        res.redirect('/')
        return
    }

}

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/users/signin')
    }
    next()
}

module.exports = {
    isAuth: isAuth,
    getAllProduct: getAllProduct,
    deleteProducts: deleteProducts,
    showProduct: showProduct,
    deleteProduct: deleteProduct
}