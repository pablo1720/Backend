const { Schema, model, default: mongoose } = require("mongoose");
const crypto = require("crypto");
const debug = require("debug");

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo_electronico: {
      type: String,
      required: true,
      unique: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    salt: {
      type: String
    },
    imagen: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UsuarioSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      const _password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000, 64,
        `sha512`
      ).toString("hex");

      return _password;

    } catch (error) {
      debug({ error });
      return "";
    }
  },
  makeSalt: function () {
    return crypto.randomBytes(16).toString("hex");
  },
  comparePassword: function (password) {
    return this.contraseña === this.encryptPassword(password);;
  }
}

UsuarioSchema
  .virtual("password")
  .set(function (password = crypto.randomBytes(16).toString()) {
    this.salt = this.makeSalt();
    this.contraseña = this.encryptPassword(password);
  });

const IngredienteRecetaSchema = new Schema(
  {
    ingrediente: {
      type: Schema.Types.ObjectId,
      ref: "Ingrediente",
      required: true,
    },
    cantidad: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const RecetaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true
    },
    ingredientes: [
      {
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: String,
          required: true,
        },
      }
    ],
    tiempo_preparación: {
      type: String,
      required: true,
    },
    dificultad: {
      type: String,
      required: true,
    },
    instrucciones: {
      type: [String],
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    cantidad_personas: {
      type: Number,
      required: true,
    },
    costo_monetario: {
      type: String,
      required: true,
    },
    id_usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

const IngredienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: false,
    },
    imagen: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ComentarioSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    id_receta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Receta",
    },
    contenido: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ValoracionRecetaSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    id_receta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Receta",
    },
    puntuacion: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

const RecetaGuardadaSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    id_receta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Receta",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const RecetaXIngredienteSchema = new Schema(
  {
    id_receta: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Receta",
    },
    id_ingrediente: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Ingrediente",
    },
    cantidad_ingrediente: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const AlacenaSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    ingredientes: [
      {
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: String,
          required: true,
        },
      }
    ],
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Receta = mongoose.model("Receta", RecetaSchema);
const Ingrediente = mongoose.model("Ingrediente", IngredienteSchema);
const Comentario = mongoose.model("Comentario", ComentarioSchema);
const ValoracionReceta = mongoose.model("ValoracionReceta", ValoracionRecetaSchema);
const RecetaGuardada = mongoose.model("RecetaGuardada", RecetaGuardadaSchema);
const RecetaXIngrediente = mongoose.model("RecetaXIngrediente", RecetaXIngredienteSchema);
const Alacena = mongoose.model("Alacena", AlacenaSchema);

module.exports = {
  Usuario,
  Receta,
  Ingrediente,
  Comentario,
  ValoracionReceta,
  RecetaGuardada,
  RecetaXIngrediente,
  Alacena,
};