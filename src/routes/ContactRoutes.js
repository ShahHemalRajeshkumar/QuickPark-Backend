const routes = require('express').Router();
const contactController = require('../controllers/ContactController');

routes.post('/addcontact', contactController.addContact);
routes.get('/getallcontacts', contactController.getAllContacts);
routes.get('/getcontactbyid/:id', contactController.getContactById);
routes.delete('/deletecontact/:id', contactController.deleteContact);

module.exports = routes;
