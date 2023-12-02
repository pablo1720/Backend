const httpError = require('http-errors');
const { Usuario, Receta, Ingrediente, Comentario, ValoracionReceta, RecetaGuardada, RecetaXIngrediente, Alacena } = require('../models/recipes.model');


const createRecipe = async (req, res, next) => {
  try {
    const { body } = req;

    const newRecipe = new Receta(body);

    const savedRecipe = await newRecipe.save();

    if (!savedRecipe) throw httpError(500, "Recipe not created");

    return res.status(201).json({ message: "Recipe created", data: savedRecipe });
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const pageSize = 16;
    const skip = (page - 1) * pageSize;

    const recipes = await Receta.find().skip(skip).limit(pageSize);

    if (!recipes || recipes.length === 0) {
      throw httpError(404, "Recipes not found");
    }

    return res.status(200).json({ data: recipes });
  } catch (error) {
    next(error);
  }
};

const getOneRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Receta.findById(id);

    if (!recipe) throw httpError(404, "Recipe not found");

    return res.status(200).json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const toUpdateRecipe = await Receta.findById(id);

    if (!toUpdateRecipe) throw httpError(404, "Recipe not found");

    if (body.nombre) toUpdateRecipe.nombre = body.nombre;
    if (body.ingredientes) toUpdateRecipe.ingredientes = body.ingredientes;
    if (body.tiempo_preparacion) toUpdateRecipe.tiempo_preparación = body.tiempo_preparacion;
    if (body.dificultad) toUpdateRecipe.dificultad = body.dificultad;
    if (body.instrucciones) toUpdateRecipe.instrucciones = body.instrucciones;
    if (body.imagen) toUpdateRecipe.imagen = body.imagen;
    if (body.cantidad_personas) toUpdateRecipe.cantidad_personas = body.cantidad_personas;
    if (body.costo_monetario) toUpdateRecipe.costo_monetario = body.costo_monetario;

    const updatedRecipe = await toUpdateRecipe.save();

    return res.status(200).json({ message: "Recipe updated", data: updatedRecipe });
  } catch (error) {
    next(error);
  }
};


const toggleFavoriteRecipe = async (req, res, next) => {
  try {
    const { id, userId } = req.params;

    const userFavoriteRecipe = await RecetaGuardada.findOne({
      id_usuario: userId,
      id_receta: id,
    });

    if (userFavoriteRecipe) {

      userFavoriteRecipe.favorite = !userFavoriteRecipe.favorite;
      await userFavoriteRecipe.save();
    } else {

      await RecetaGuardada.create({
        id_usuario: userId,
        id_receta: id,
        favorite: true,
      });
    }

    return res.status(200).json({ message: "Favorite status updated" });
  } catch (error) {
    next(error);
  }
};


const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todeleteRecipe = await Receta.findById(id);

    if (!todeleteRecipe) throw httpError(404, "Recipe not found");

    const deletedRecipe = await Receta.findByIdAndDelete(id);

    if (!deletedRecipe) throw httpError(500, "Recipe not deleted");

    return res.status(200).json({ message: "Recipe deleted", data: deletedRecipe });
  } catch (error) {
    next(error);
  }
};

const searchRecipesByName = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      throw httpError(400, "Missing 'nombre' parameter");
    }

    const recipes = await Receta.find({
      nombre: { $regex: new RegExp(nombre, "i") },
    });

    if (!recipes || recipes.length === 0) {
      throw httpError(404, `Recipes with name '${nombre}' not found`);
    }

    return res.status(200).json({ data: recipes });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { nombre, correo_electronico, password, imagen } = req.body;

    const existingUser = await Usuario.findOne({ correo_electronico });

    if (existingUser) {
      throw httpError(
        400,
        "Correo electrónico ya registrado. Inicie sesión en lugar de registrarse."
      );
    }

    const newUser = new Usuario({
      nombre: nombre,
      correo_electronico: correo_electronico,
      password: password,
      imagen: imagen,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};


const loginUser = async (req, res, next) => {
  try {
    const { correo_electronico, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo_electronico });

    if (!usuario) {
      throw httpError(401, 'Usuario no encontrado');
    }

    if (usuario.comparePassword(contraseña)) {
      throw httpError(401, 'Credenciales incorrectas');
    }

    return res.json({ message: 'Inicio de sesión exitoso', usuario: { id: usuario.id, nombre: usuario.nombre, correo_electronico: usuario.correo_electronico, imagen: usuario.imagen } });
  } catch (error) {
    next(error);
  }
};

const createIngredient = async (req, res, next) => {
  try {
    const { body } = req;

    const newIngredient = new Ingrediente(body);

    const savedIngredient = await newIngredient.save();

    if (savedIngredient === null) {
      throw httpError(500, "Ingredient not created");
    }

    return res.status(201).json({ message: "Ingredient created", data: savedIngredient });
  } catch (error) {
    next(error);
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const toDeleteIngredient = await Ingrediente.findById(id);

    if (!toDeleteIngredient) {
      throw httpError(404, "Ingredient not found");
    }

    const deletedIngredient = await Ingrediente.findByIdAndDelete(id);

    if (!deletedIngredient) {
      throw httpError(500, "Ingredient not deleted");
    }

    return res.status(200).json({ message: "Ingredient deleted", data: deletedIngredient });
  } catch (error) {
    next(error);
  }
};

const searchIngredientsByName = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      throw httpError(400, "Missing 'nombre' parameter");
    }
    const ingredients = await Ingrediente.find({
      nombre: { $regex: new RegExp(nombre, "i") },
    });
    if (!ingredients || ingredients.length === 0) {
      throw httpError(404, `Ingredients with name '${nombre}' not found`);
    }
    return res.status(200).json({ data: ingredients });
  } catch (error) {
    next(error);
  }
};

const addCommentAndRating = async (req, res, next) => {
  try {
    const { comments, ratings } = req.body;

    const comentariosArray = comments.map(comment => ({
      id_usuario: comment.id_usuario,
      id_receta: comment.id_receta,
      contenido: comment.contenido,
    }));


    const valoracionesArray = ratings.map(rating => ({
      id_usuario: rating.id_usuario,
      id_receta: rating.id_receta,
      puntuacion: rating.puntuacion,
    }));

    await Comentario.insertMany(comentariosArray);
    await ValoracionReceta.insertMany(valoracionesArray);

    return res.status(201).json({ message: "Comment and rating added successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserRecipes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw httpError(400, "Missing 'userId' parameter");
    }
    const recipes = await Receta.find({ id_usuario: userId });
    if (!recipes || recipes.length === 0) {
      throw httpError(404, `Recipes for user with ID '${userId}' not found`);
    }
    return res.status(200).json({ data: recipes });
  } catch (error) {
    next(error);
  }
};


const getUserSavedRecipes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw httpError(400, "Missing 'userId' parameter");
    }
    const savedRecipes = await RecetaGuardada.find({ id_usuario: userId });
    if (!savedRecipes || savedRecipes.length === 0) {
      throw httpError(404, `Saved recipes for user with ID '${userId}' not found`);
    }
    return res.status(200).json({ data: savedRecipes });
  } catch (error) {
    next(error);
  }
};

const getCommentsAndRatings = async (req, res, next) => {
  try {
    const { recetaId } = req.params;

    if (!recetaId) {
      throw httpError(400, "Missing 'recetaId' parameter");
    }

    const comentarios = await Comentario.find({ id_receta: recetaId }).populate('id_usuario', 'nombre imagen');
    const valoraciones = await ValoracionReceta.find({ id_receta: recetaId }).populate('id_usuario', 'nombre imagen');

    if (!comentarios || !valoraciones) {
      throw httpError(404, "Comments or ratings not found");
    }

    const formattedData = {};

    comentarios.forEach((comentario) => {
      const { id_usuario, contenido } = comentario;
      const usuarioInfo = id_usuario ? { nombre: id_usuario.nombre, imagen: id_usuario.imagen } : null;

      if (!formattedData[id_usuario]) {
        formattedData[id_usuario] = { usuario: usuarioInfo, contenido: null, valoracion: null };
      }

      formattedData[id_usuario].contenido = contenido;
    });

    valoraciones.forEach((valoracion) => {
      const { id_usuario, puntuacion } = valoracion;
      const usuarioInfo = id_usuario ? { nombre: id_usuario.nombre, imagen: id_usuario.imagen } : null;

      if (!formattedData[id_usuario]) {
        formattedData[id_usuario] = { usuario: usuarioInfo, contenido: null, valoracion: null };
      }

      formattedData[id_usuario].valoracion = puntuacion;
    });

    return res.status(200).json({ data: Object.values(formattedData) });
  } catch (error) {
    next(error);
  }
};



const addToAlacena = async (req, res, next) => {
  try {
    const { id_usuario, nombre_ingrediente, cantidad_ingrediente } = req.body;

    const existingIngredient = await Alacena.findOne({
      id_usuario,
      "ingredientes.nombre": nombre_ingrediente,
    });

    if (existingIngredient) {
      existingIngredient.ingredientes.forEach((ingrediente) => {
        if (ingrediente.nombre === nombre_ingrediente) {
          ingrediente.cantidad += cantidad_ingrediente;
        }
      });

      await existingIngredient.save();
      res.status(200).json({ message: "Item updated in alacena successfully" });
    } else {

      let userAlacena = await Alacena.findOne({ id_usuario });

      if (!userAlacena) {
        userAlacena = new Alacena({ id_usuario, ingredientes: [] });
      }

      userAlacena.ingredientes.push({ nombre: nombre_ingrediente, cantidad: cantidad_ingrediente });

      await userAlacena.save();
      return res.status(201).json({ message: "Item added to alacena successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const editUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { nombre, correo_electronico, contraseña, imagen } = req.body;
    const existingUser = await Usuario.findById(userId);
    if (!existingUser) {
      throw httpError(404, `User with ID '${userId}' not found`);
    }

    if (nombre) existingUser.nombre = nombre;
    if (correo_electronico) existingUser.correo_electronico = correo_electronico;
    if (contraseña) existingUser.contraseña = contraseña;
    if (imagen) existingUser.imagen = imagen;

    await existingUser.save();
    return res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAlacena = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw httpError(400, "Missing 'userId' parameter");
    }

    const userAlacena = await Alacena.findOne({ id_usuario: userId });

    if (!userAlacena) {
      throw httpError(404, `Alacena not found for user with ID '${userId}'`);
    }

    const ingredients = userAlacena.ingredientes;

    return res.status(200).json({ data: ingredients });
  } catch (error) {
    next(error);
  }
};


const removeFromAlacena = async (req, res, next) => {
  try {
    const { id_usuario, nombre_ingrediente } = req.body;

    const userAlacena = await Alacena.findOne({ id_usuario });

    if (!userAlacena) {
      throw httpError(404, `Alacena not found for user with ID '${id_usuario}'`);
    }

    const updatedIngredientes = userAlacena.ingredientes.filter(
      (ingrediente) => ingrediente.nombre !== nombre_ingrediente
    );

    userAlacena.ingredientes = updatedIngredientes;

    await userAlacena.save();
    return res.status(200).json({ message: "Ingredient removed from alacena successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteAlacena = async (req, res, next) => {
  try {
    const { id_usuario } = req.params;

    // Busca y elimina la alacena del usuario
    const deletedAlacena = await Alacena.findOneAndDelete({ id_usuario });

    if (!deletedAlacena) {
      throw httpError(404, `Alacena not found for user with ID '${id_usuario}'`);
    }

    return res.status(200).json({ message: "Alacena deleted successfully", data: deletedAlacena });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};