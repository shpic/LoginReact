const express = require('express');

const router = new express.Router();

router.get('/dashboard',(req,res)=>{
  res.status(200).json({
    message:'Vi ste ovlasceni da vidite ovu poruku.'
  });
});

module.exports = router;
