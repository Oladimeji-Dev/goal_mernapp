const express = require("express");

const router = express.Router();


router.get('/').getUsers()

const { getUsers } = require("../controllers/userController");
