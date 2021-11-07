const Cart = require('../model/cart')
const Product = require('../model/product')

const showCart = (req, res, next) => {
    showIdProduct(req, res, next)
}

const showIdProduct = (req, res, next) => {
    let email = ''
    let idUser = ''
    if (req.isAuthenticated()) {
        email = req.user.email
        idUser = req.user._id
    }
    var products = []

    const data = Product.find({}, (err, product) => {

        product.forEach(item => {
            Cart.find({ _idUser: idUser }, ('_idProduct'), (err, carts) => {

                carts.forEach(element => {
                    if (item._id + '_' + idUser === element._idProduct) {
                        products.push(item)
                    }
                });
            })
        });
    })

    console.log(data);
    res.render('product/cart', {
        title: 'Shopping Cart',
        checkAuthUser: req.isAuthenticated(),
        carts: data,
        user: {
            email: email
        },
    })
}


/* POST */
const postProduct = (req, res, next) => {
    let idUser = ''
    if (req.isAuthenticated()) {
        idUser = req.user._id
    } else {
        return
    }
    const cart = new Cart({
        _idUser: idUser,
        _idProduct: req.params._idProduct + '_' + idUser,
        createdAt: Date.now()
    })

    // check email unique
    Product.findOne({ _id: req.params._idProduct }, (productError, product) => {
        if (productError) {
            console.log('productError: ', productError);
            res.redirect(`/products/${req.params._idProduct}`)
            return
        }

        if (!product) {
            console.log('product not found');
            res.redirect('/products/shop/carts')
            return
        }

        Cart.findOne({ _idProduct: req.params._idProduct + '_' + idUser }, (cartError, cartResult) => {
            if (cartError) {
                console.log('cartError: ', cartError);
                res.redirect(`/products/${req.params._idProduct}`)
                return
            }

            if (cartResult) {
                console.log('product already in cart');
                res.redirect(`/products/${req.params._idProduct}`)
                return
            }
            cart.save((saveError, result) => {
                if (saveError) {
                    console.log('saveError: ', saveError);
                    return
                }
                console.log('save success');
                res.redirect('/products/shop/carts')
                return
            })

        })

    })
}

const isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/users/signin')
    }
    next()
}

module.exports = {
    isAuth: isAuth,
    showCart: showCart,
    showIdProduct: showIdProduct,
    postProduct: postProduct
}