const express = require('express');
const router = express.Router();
const UserCompanyDetails = require('../models/userCompanyModel');

//Create a new UserCompanyDetails
const createUserCompanyDetails = async (req,res) => {
  try {
    const userCompanyDetails = new UserCompanyDetails(req.body);
    await userCompanyDetails.save();
    res.status(201).send(userCompanyDetails);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Get all UserCompanyDetails
const getAllUserCompanyDetails = async (req,res) => {
  try {
    const userCompanyDetails = await UserCompanyDetails.find({});
    res.status(200).send(userCompanyDetails);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a single UserCompanyDetails by id
const getUserCompanyDetailsById = async(req,res) => {
  try {
    const userCompanyDetails = await UserCompanyDetails.findById(req.params.id);
    if (!userCompanyDetails) {
      return res.status(404).send();
    }
    res.status(200).send(userCompanyDetails);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update a UserCompanyDetails by id
const updateUserCompanyDetails = async (req,res) => {
  try {
    const userCompanyDetails = await UserCompanyDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userCompanyDetails) {
      return res.status(404).send();
    }
    res.status(200).send(userCompanyDetails);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Delete a UserCompanyDetails by id
const deleteUserCompanyDetails = async (req,res) => {
  try {
    const userCompanyDetails = await UserCompanyDetails.findByIdAndDelete(req.params.id);
    if (!userCompanyDetails) {
      return res.status(404).send();
    }
    res.status(200).send(userCompanyDetails);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports={
    createUserCompanyDetails,
    getAllUserCompanyDetails,
    getUserCompanyDetailsById,
    deleteUserCompanyDetails,
    updateUserCompanyDetails,
};
