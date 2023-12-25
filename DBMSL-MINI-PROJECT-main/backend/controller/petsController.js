const { default: mongoose } = require('mongoose')
const Pets = require('../models/pets')


//get all pets
const getPets = async (req, res) => {
    const pets = await Pets.find({}).sort({ createdAt: 1 })
    res.status(200).json(pets)
}



const getPet = async (req, res) => {
    const { animalType, gender, maxAge } = req.params;

    try {
        if (!animalType || !gender || !maxAge) {
            return res.status(400).json({ error: 'Animal type, gender, and max age are all required parameters' });
        }

        const pets = await Pets.find({ Animaltype: animalType, Gender: gender, Age: { $lte: maxAge } });

        if (!pets || pets.length === 0) {
            return res.status(404).json({ error: 'No pets matching the specified criteria found' });
        }

        res.status(200).json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//create new pet
const createPet = async (req, res) => {
    const { Name, Animaltype, Age, Gender, NGO_ID , p_ID} = req.body
    try {
        const workout = await Pets.create({ Name, Animaltype, Age, Gender, NGO_ID , p_ID})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



const deletePets = async (req, res) => {
    const { p_ID, ngo_ID } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(p_ID) || !mongoose.Types.ObjectId.isValid(ngo_ID)) {
    //     return res.status(404).json({ error: 'Invalid ID' });
    // }

    try {
        const pet = await Pets.findOneAndDelete({ p_ID: p_ID, NGO_ID: ngo_ID });

        if (!pet) {
            return res.status(404).json({ error: 'No such data' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const UpdatePets = async (req, res) => {
    const { p_ID, ngo_ID } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(toString(p_ID)) || !mongoose.Types.ObjectId.isValid(toString(ngo_ID))) {
    //     return res.status(404).json({ error: 'Invalid ID' });
    // }

    try {
        const pet = await Pets.findOneAndUpdate({ p_ID: p_ID, NGO_ID: ngo_ID }, { $set: req.body }, { new: true });

        if (!pet) {
            return res.status(404).json({ error: 'No such data' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPet,
    getPet,
    getPets,
    UpdatePets,
    deletePets
}