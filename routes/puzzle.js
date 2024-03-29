const { Router } = require('express'); 
const router = Router();

const Progress = require('../database/schemas/Progress');

router.get('/:id', (req, res) => {
    const petcode = req.params.id;
    var squares = []; 
    for (let i = 1; i < 10; i++) { squares[i-1] = `/assets/puzzles/${petcode}/piece${i}.jpg`; }
    res.render('puzzle', { title: "Puzzle Time!", has_style: "puzzle", squares: squares });
});

module.exports = router;