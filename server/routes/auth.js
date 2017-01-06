const express = require('express');
const validator = require('validator');

const router = new express.Router();

//validacija SignUpForm (otvaranja novog naloga)
//(param) {object} payload  http body poruka
//return {object} rezultat validacije.objekat sadrzi bool tip validacije,errors tipove, i globalnu poruku za celu formu

function validateSignUpForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email))
  {
    isFormValid = false;
    errors.email = 'Molim Vas unesite validnu elektronsku adresu.';
  }
  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8)
  {
    isFormValid = false;
    errors.password = 'Lozinka mora da ima bar 8 karaktera.';
  }
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0)
  {
    isFormValid = false;
    errors.name = 'Molim Vas unesite ime.';
  }
  if (!isFormValid)
  {
    message = 'Proverite formu zbog greske';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

//validacija LoginForm (Prijave)
//(param) {object} payload  http body poruka
//return {object} rezultat validacije.objekat sadrzi bool tip validacije,errors tipove, i globalnu poruku za celu formu

function validateLoginForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0)
  {
    isFormValid = false;
    errors.email = 'Molim Vas unesite elektronsku adresu.';
  }
  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0)
  {
    isFormValid = false;
    errors.password = 'Molim Vas unesite lozinku.';
  }

  if (!isFormValid)
  {
    message = 'Proverite formu zbog greske';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup',(req,res) => {
  const validationResult = validateSignUpForm(req.body);
  if(!validationResult.success){
    return res.status(400).json({
      success:false,
      message:validationResult.message,
      errors:validationResult.errors
    })
  }
  return res.status(200).end();
})

router.post('/login',(req,res) => {
  const validationResult = validateLoginForm(req.body);
  if(!validationResult.success){
    return res.status(400).json({
      success:false,
      message:validationResult.message,
      errors:validationResult.errors
    })
  }
  return res.status(200).end();
})

module.exports = router;
