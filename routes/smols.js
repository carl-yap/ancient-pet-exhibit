const { Router } = require('express'); 
const router = Router();

const Progress = require('../database/schemas/Progress');
const Pet = require('../database/schemas/Pet')

router.get('/', (req, res) => {
    res.render('smol', { title: "Meet the Small Fellows" });
});

router.get('/:id', async (req, res) => {
    try {
        const petcode = req.params.id;
        const pet_data = await Pet.findOne({species: 'cheem', petcode: petcode});
        res.send(pet_data);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
})

module.exports = router;