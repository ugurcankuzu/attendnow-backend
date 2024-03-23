const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./Database/connectDatabase");
const ErrorHandler = require("./Middleware/errors/ErrorHandler");
const routers = require("./routers/main");

dotenv.config({

    path : "./config/env/config.env"
});

connectDatabase();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/", routers);

app.use(ErrorHandler);

app.listen(PORT, () => {

    console.log("Server Başlatıldı. PORT: ", PORT);
})