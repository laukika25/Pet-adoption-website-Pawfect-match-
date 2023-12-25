const express = require('express');
const Mem = require('../models/member')

const {getMember,
    updateMember,
    updateMemberPIdNgoId,
  insertMember,
getMembers} = require('../controller/membercontroller')

const router = express.Router()

router.get('/:AadhaarID', getMember);

router.get('/', getMember);

// router.patch('/:AadhaarID', updateMember)

router.patch('/:AadhaarID', updateMemberPIdNgoId)

router.post('/',async (req, res) => {
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
})

module.exports = router