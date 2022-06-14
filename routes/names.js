const controller = require('../controllers/names');

module.exports = (app) => {
    app.post('/names', (req, res) => {
        controller.read(req.body.group).then(u => res.json(u));
    });


}

