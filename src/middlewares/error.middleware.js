const debug = require('debug')('recipes-api:error');

const errorHandler = (err, req, res, next) => {
    debug(err);
    return res.status(err.status || 500).json({ message: err.message });
};

module.exports = { errorHandler };