const { Router } = require('express'); 
const router = Router();

const Dialogue = require('../database/schemas/Dialogue');
const User = require('../database/schemas/User');
const Progress = require('../database/schemas/Progress');


router.get('/', async (req, res) => {
    try {
        if (!req.session.userId) res.redirect('../');
        res.render('home', {title: "Welcome to the Exhibit!"});
    } catch(e){
        console.log(e)
    }
    
    
});

router.get('/name', async (req, res) => {
    console.log(req.session)
    
    const user = await User.findById(req.session.userId);
    res.send(user.username);
});

router.post('/next', async (req, res) => {
    try {
        if (req.body.dialogue_number >= 4) res.sendStatus(404);
        const dialogue_number = "about-" + req.body.dialogue_number;
        const dialogue = await Dialogue.findOne({name: dialogue_number});
        res.send(dialogue);
    } catch (e) {
        console.log(e);
    }
});


module.exports = router;