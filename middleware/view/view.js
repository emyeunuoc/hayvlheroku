module.exports = function (req, res, next) {
    countView++;
    next();
}