const { param, body } = require("express-validator");

const UserValidator = [
  body("nombre")
    .isString()
    .withMessage("nombre should be a string")
    .notEmpty()
    .withMessage("nombre is required")
    .isLength({ min: 4 })
    .withMessage("nombre should have at least 4 characters"),

  body("correo_electronico")
    .isString()
    .withMessage("correo_electronico should be a string")
    .notEmpty()
    .withMessage("correo_electronico is required")
    .isEmail()
    .withMessage("correo_electronico should be a valid email"),

  body("contraseña")
    .isString()
    .withMessage("contraseña should be a string")
    .notEmpty()
    .withMessage("contraseña is required")
    .isLength({ min: 8 })
    .withMessage("contraseña should have at least 6 characters"),

  body("imagen")
    .isString()
    .withMessage("imagen should be a string")
    .isURL()
    .withMessage("imagen should be a valid URL"),
];

const RecetaValidator = [
  body("nombre")
    .isString()
    .withMessage("nombre should be a string")
    .notEmpty()
    .withMessage("nombre is required"),

  body("ingredientes")
    .isArray()
    .withMessage("ingredientes should be an array")
    .notEmpty()
    .withMessage("ingredientes is required"),

  body("descripción")
    .isString()
    .withMessage("descripción should be a string")
    .notEmpty()
    .withMessage("ingredientes is required"),

  body("tiempo_preparación")
    .isString()
    .withMessage("tiempo_preparación should be a string")
    .notEmpty()
    .withMessage("tiempo_preparación is required"),

  body("dificultad")
    .isString()
    .withMessage("dificultad should be a string")
    .notEmpty()
    .withMessage("dificultad is required"),

  body("instrucciones")
    .isString()
    .withMessage("instrucciones should be a string")
    .notEmpty()
    .withMessage("instrucciones is required"),

  body("imagen")
    .isString()
    .withMessage("imagen should be a string")
    .isURL()
    .withMessage("imagen should be a valid URL"),

  body("cantidad_personas")
    .isNumeric()
    .withMessage("cantidad_personas should be a number")
    .notEmpty()
    .withMessage("cantidad_personas is required"),

  body("costo_monetario")
    .isString()
    .withMessage("costo_monetario should be a string")
    .notEmpty()
    .withMessage("costo_monetario is required"),

  body("id_usuario")
    .notEmpty()
    .withMessage("id_usuario is required")
    .isMongoId()
    .withMessage("id_usuario must be a valid Mongo ID"),
];

const IngredienteValidator = [
  body("nombre")
    .isString()
    .withMessage("nombre should be a string")
    .notEmpty()
    .withMessage("nombre is required"),

  body("categoria")
    .isString()
    .withMessage("categoria should be a string")
    .notEmpty()
    .withMessage("categoria is required"),

  body("imagen")
    .isString()
    .withMessage("imagen should be a string")
    .notEmpty()
    .withMessage("imagen is required")
    .isURL()
    .withMessage("imagen should be a valid URL"),
];

const ComentarioValidator = [
  body("id_usuario")
    .isString()
    .withMessage("id_usuario should be a string")
    .notEmpty()
    .withMessage("id_usuario is required")
    .isMongoId()
    .withMessage("id_usuario must be a valid Mongo ID"),

  body("id_receta")
    .isString()
    .withMessage("id_receta should be a string")
    .notEmpty()
    .withMessage("id_receta is required")
    .isMongoId()
    .withMessage("id_receta must be a valid Mongo ID"),

  body("contenido")
    .isString()
    .withMessage("contenido should be a string")
    .notEmpty()
    .withMessage("contenido is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("contenido should be between 1 and 500 characters"),
];

const ValoracionRecetaValidator = [
  body("id_usuario")
    .isString()
    .withMessage("id_usuario should be a string")
    .notEmpty()
    .withMessage("id_usuario is required")
    .isMongoId()
    .withMessage("id_usuario must be a valid Mongo ID"),

  body("id_receta")
    .isString()
    .withMessage("id_receta should be a string")
    .notEmpty()
    .withMessage("id_receta is required")
    .isMongoId()
    .withMessage("id_receta must be a valid Mongo ID"),

  body("puntuacion")
    .isNumeric()
    .withMessage("puntuacion should be a number")
    .notEmpty()
    .withMessage("puntuacion is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("puntuacion should be between 0 and 5"),
];

const RecetaGuardadaValidator = [
  body("id_usuario")
    .isString()
    .withMessage("id_usuario should be a string")
    .notEmpty()
    .withMessage("id_usuario is required")
    .isMongoId()
    .withMessage("id_usuario must be a valid Mongo ID"),

  body("id_receta")
    .isString()
    .withMessage("id_receta should be a string")
    .notEmpty()
    .withMessage("id_receta is required")
    .isMongoId()
    .withMessage("id_receta must be a valid Mongo ID"),
];

const RecetaXIngredienteValidator = [
  body("id_receta")
    .isString()
    .withMessage("id_receta should be a string")
    .notEmpty()
    .withMessage("id_receta is required")
    .isMongoId()
    .withMessage("id_receta must be a valid Mongo ID"),

  body("id_ingrediente")
    .isString()
    .withMessage("id_ingrediente should be a string")
    .notEmpty()
    .withMessage("id_ingrediente is required")
    .isMongoId()
    .withMessage("id_ingrediente must be a valid Mongo ID"),

  body("cantidad_ingrediente")
    .isNumeric()
    .withMessage("cantidad_ingrediente should be a number")
    .notEmpty()
    .withMessage("cantidad_ingrediente is required"),
];

const AlacenaValidator = [
  body("id_usuario")
    .notEmpty()
    .withMessage("id_usuario is required")
    .isMongoId()
    .withMessage("id_usuario must be a valid Mongo ID"),

  body("nombre_ingrediente")
    .isString()
    .withMessage("nombre_ingrediente should be a string")
    .notEmpty()
    .withMessage("nombre_ingrediente is required")
    .isMongoId()
    .withMessage("nombre_ingrediente must be a valid Mongo ID"),

  body("cantidad_ingrediente")
    .isString()
    .withMessage("cantidad_ingrediente should be a string")
    .notEmpty()
    .withMessage("cantidad_ingrediente is required"),
];

module.exports = {
  UserValidator,
  RecetaValidator,
  IngredienteValidator,
  ComentarioValidator,
  ValoracionRecetaValidator,
  RecetaGuardadaValidator,
  RecetaXIngredienteValidator,
  AlacenaValidator,
};
