const express = require("express");
const router = express.Router();

const recipeRouter = require('./recipe.router');
router.use('/recipes', recipeRouter);

module.exports = router;
