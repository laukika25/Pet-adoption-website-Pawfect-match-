const express = require('express');
const Pets = require('../models/pets')

const {createPet, getPet, getPets, UpdatePets, deletePets} = require('../controller/petsController')


const router = express.Router()

//get all pets
router.get('/', getPets)

//GET a single pet
router.get('/:animalType/:gender/:maxAge', getPet);

//POST
router.post('/', async (req, res) => {
    const { Name, Animaltype, Age, Gender, NGO_ID , p_ID} = req.body
    try {
        const workout = await Pets.create({ Name, Animaltype, Age, Gender, NGO_ID , p_ID})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'POST a new workout'})
})

//UPDATE
router.patch('/:p_ID/:ngo_ID', UpdatePets)

//POST
router.delete('/:p_ID/:ngo_ID', deletePets)

module.exports = router