const { Router } = require('express'); 
const router = Router();

const User = require('../database/schemas/User');
const Progress = require('../database/schemas/Progress');
const Pet = require('../database/schemas/Pet');

router.get('/:id', (req, res) => {
    if (!req.session.userId) { res.redirect('../'); return; }
    const petcode = req.params.id;
    var squares = []; 
    for (let i = 1; i < 10; i++) { squares[i-1] = `/assets/puzzles/${petcode}/piece${i}.jpg`; }
    res.render('puzzle', { title: "Puzzle Time!", has_style: "puzzle", squares: squares });
});

router.get('/:id/success', async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId }); 
    const user_prog = await Progress.findOne({ _id: user.progress });

    function unlock(user_prog, species, index) {
        switch (species) {
            case "doggo": user_prog.doggo[index-1] = true; break;
            case "hissy": user_prog.hissy[index-1] = true; break;
            case "borb" : user_prog.borb[index-1]  = true; break;
            case "smol" : user_prog.smol[index-1]  = true; break;
            default: break;
        }
    };

    try {
        const species = req.params.id.slice(0, -2);
        const index = req.params.id.slice(-1);
        unlock(user_prog, species, index);
        await user_prog.save();
        res.redirect('../../' + species + 's');
    } catch (e) {
        res.sendStatus(404);
    }
});

module.exports = router;