const { Router } = require('express'); 
const router = Router();

const Dialogue = require('../database/schemas/Dialogue');
const User = require('../database/schemas/User');
const Progress = require('../database/schemas/Progress');


router.get('/', (req, res) => {
    if (req.session.userId) { res.redirect('/home'); }
    res.render('intro', {title: "Welcome..."});
});

router.post('/next', async (req, res) => {
    try {
        if (req.body.dialogue_number >= 5) res.sendStatus(404);
        const dialogue_number = "intro-" + req.body.dialogue_number;
        const dialogue = await Dialogue.findOne({name: dialogue_number});
        res.send(dialogue);
    } catch (e) {
        console.log(e);
    }
});

router.post('/name', async (req, res) => {
    try{
        const name = req.body.name;
        const newProgress = new Progress({username: name})
        const newUser = new User({
            username: name,
            progress: newProgress
        });
        const existingUser = await User.findOne({username: name});
        if(existingUser){
            console.log("Returning User");
            req.session.userId = existingUser._id;
        }
        else{
            await newProgress.save();
            await newUser.save();
            console.log("New User");
            console.log(newUser);
            req.session.userId = newUser._id;
        }
        console.log('User in Session');
        
        res.sendStatus(200);
        
    } catch (e){
        console.log(e);
    }
});
/*
router.get('/home', (req, res) => {
    res.render('home', {title: "Welcome to the Exhibit!"});
});*/

module.exports = router;