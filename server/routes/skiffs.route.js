//import myt controllers
const SkiffsController = require('../controllers/skiffs.controller');

// create the valid routes
module.exports = (app) => {
    app.get('/api/skiffs', SkiffsController.getAll);
    app.post('/api/skiffs', SkiffsController.create);
    app.get('/api/skiff/:id', SkiffsController.getOne);
    app.put('/api/skiff/:id', SkiffsController.update);
    app.delete('/api/skiff/:id', SkiffsController.delete);
}