const getIndex = (req, res, next) => {
    let email = ''
    if (req.isAuthenticated()) {
        email = req.user.email
    }
    res.render('index', {
        title: 'Shopping Cart',
        checkAuthUser: req.isAuthenticated(),
        user: {
            email: email
        }
    });
}

module.exports = {
    getIndex: getIndex
}