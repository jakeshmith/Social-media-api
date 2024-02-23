const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

// In this file, I am bringing in Express, and both of the other routes files (which contain the actual routes), assigns them an api path, and allows the routes to be fully realized.