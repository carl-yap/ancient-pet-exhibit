const { Router } = require('express'); 
const router = Router();

const User = require('../database/schemas/User');
const Progress = require('../database/schemas/Progress');
const Pet = require('../database/schemas/Pet')

router.get('/', async (req, res) => {
    try{
        if (!req.session.userId) { res.redirect('../'); return; }
        const userId = req.session.userId;
        const cur_user = await User.findById(req.session.userId)
        console.log(userId + cur_user.username);//okay, searched userid and usernaem
        const progress = await Progress.findById(cur_user.progress).lean();
        console.log(progress)//okay, searched by current user's progress id then logged appropriately
        const hissies = await Pet.find({species:'hissy'}).lean();
        console.log(hissies)
        res.render('hissys', { 
            title: "Meet the Hissies", 
            has_style: "hissys",
            progress: progress, 
            hissies: hissies}); // for showing locked
    } catch(e){
        console.log(e);
        res.sendStatus(404);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const petcode = req.params.id;
        const pet_data = await Pet.findOne({species: 'hissy', petcode: petcode});
        res.send(pet_data);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
})

module.exports = router;