const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> c28d0e864747330558435af0ef61d3a7659426e3
