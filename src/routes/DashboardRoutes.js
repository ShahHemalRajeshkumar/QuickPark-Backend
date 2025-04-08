const routes = require('express').Router();
const DashboardController = require('../controllers/DashboardController');
routes.get("/dashboarddetails", DashboardController.getDashboardStats);
routes.get("/latestdetails", DashboardController.getLatestBookings);
routes.get("/monthlybooking", DashboardController.getMonthlyBookings);
module.exports = routes;