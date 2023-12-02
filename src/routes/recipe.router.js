const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getRecipes,
  getOneRecipe,
  updateRecipe,
  toggleFavoriteRecipe,
  deleteRecipe,
  searchRecipesByName,
  registerUser,
  loginUser,
  createIngredient,
  deleteIngredient,
  searchIngredientsByName,
  addCommentAndRating,
  getUserRecipes,
  getUserSavedRecipes,
  getCommentsAndRatings,
  addToAlacena,
  getAlacena,
  editUserProfile,
  removeFromAlacena,
  /* deleteAlacena, */
} = require("../controllers/recipe.controller");

router.post("/recipes", createRecipe); //Funciona
router.get("/recipes", getRecipes); //Funciona
router.get("/recipe/:id", getOneRecipe); //Funciona
router.patch("/recipe/:id", updateRecipe); // Funciona
router.patch("/recipes/:id/toggle-favorite/:userId", toggleFavoriteRecipe); //Funciona
router.delete("/recipe/:id", deleteRecipe); // Funciona
router.get("/recipes/search", searchRecipesByName); // Funciona

router.post("/users/register", registerUser); //Funciona
router.post("/users/login", loginUser); //Funciona
router.patch("/users/:userId/edit-profile", editUserProfile); //Funciona a excepcion de actualizar password
router.get("/users/:userId/recipes", getUserRecipes); //Funcina
router.get("/users/:userId/saved-recipes", getUserSavedRecipes); //Funciona

router.post("/ingredients", createIngredient); //Funciona
router.delete("/ingredients/:id", deleteIngredient); //Funciona
router.get("/ingredients/search", searchIngredientsByName); //Funciona

router.post("/recipes/:recetaId/comments-ratings", addCommentAndRating); //Funciona
router.get("/recipes/:recetaId/comments-ratings", getCommentsAndRatings); //Funciona

router.post("/users/alacena", addToAlacena); //Funciona
router.get("/users/:userId/alacena", getAlacena); //Funciona
router.delete("/users/alacena", removeFromAlacena); //Funciona
/* router.delete('/users/:id_usuario/alacena', deleteAlacena); */


module.exports = router;
