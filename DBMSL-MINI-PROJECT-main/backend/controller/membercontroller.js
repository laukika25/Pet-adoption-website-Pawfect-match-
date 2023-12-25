const { default: mongoose } = require('mongoose')
const Mem = require('../models/member')

const getMembers = async (req, res) => {
    const pets = await Mem.find({}).sort({ createdAt: 1 })
    res.status(200).json(pets)
}

const getMember = async (req, res) => {
  const { AadhaarId } = req.params;
  
  try {
    const member = await Mem.find({AadhaarId : AadhaarId});
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateMember = async (req, res) => {
  const { AadhaarId } = req.params;
  const updates = req.body;
  
  try {
    const member = await Mem.findAndUpdate({ AadhaarId: AadhaarId }, updates, { new: true });
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateMemberPIdNgoId = async (req, res) => {
  const { AadhaarId } = req.params;
  const { p_ID, NGO_ID } = req.body;
  
  try {
    const member = await Mem.findAndUpdate({ AadhaarId: AadhaarId }, { p_ID, NGO_ID }, { new: true });
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const insertMember = async (req, res) => {
  const { Name, Aadhaar_ID, Phone_no, Address } = req.body;
  const NGO_ID = 0;
  const p_ID = 0;

  try {
    const newMember = await Mem.create({
      Name,
      Aadhaar_ID,
      Phone_no,
      Address,
      NGO_ID,
      p_ID,
    });

    // const member = await newMember.save();

    res.status(200).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
    getMember,
    updateMember,
    updateMemberPIdNgoId,
  insertMember,
    getMembers
}