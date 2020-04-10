const router = require('express').Router();
const createError = require('http-errors');
const weatherRouter = require('./weather.router');

router.use('/weather', weatherRouter);

router.use((req, res, next) => {
    next(createError(404, 'Page not Found'));
});

router.use((error, req, res, next) => {
    console.error('Error status: ', error.status);
    console.error('Message: ', error.message);
    console.error('Error stack: ', error.stack);
    res.status(error.status || 500);
    res.json({
        message: error.message,
    });
    res.end();
});

module.exports = router;
