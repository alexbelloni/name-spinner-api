const controller = require('../controllers/names');

module.exports = (app) => {
    app.post('/names', (req, res) => {
        //if(process.env.FACEBOOK_ACCESS_DISABLED === '1'){
            res.json(["Alex","André", process.env.FACEBOOK_ACCESS_DISABLED])
        //} else {
            controller.read(req.body.group).then(u => res.json(u));
        //}        
    });

}

