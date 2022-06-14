const controller = require('../controllers/names');

module.exports = (app) => {
    app.post('/names', (req, res) => {
        if (process.env.FACEBOOK_ACCESS_DISABLED === '1') {
            res.json(["Alex", "André"])
        } else {
            controller.load(req.body.group)
                .then(u =>{ console.log(u);res.json(u) } )
                .catch(e => { console.log(e);res.json(e) } )
        }
    });
}

