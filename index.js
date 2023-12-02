require('dotenv').config();

const express = require("express");
const debug = require("debug")("recipes-api:server");
const morgan = require("morgan");
const cors = require("cors");


const envconfig = require("./src/config/env.config");
const database = require("./src/config/db.config");
const mainRouter = require('./src/routes/main.router');
const { errorHandler } = require('./src/middlewares/error.middleware');

database.connect();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
));

app.use('/api/v1', mainRouter);

app.use(errorHandler);

const port = envconfig.PORT;
app.listen(port, () => {
  debug(`Server is running on port ${port}`);
});

