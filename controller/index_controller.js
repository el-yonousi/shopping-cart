const getIndex = (req, res, next) => {
    res.render('index', { title: 'Shopping Cart', checkAuthUser: req.isAuthenticated() });
}

module.exports = {
    getIndex: getIndex
}