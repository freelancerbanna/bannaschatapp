const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const config = process.env;
module.exports = config;

// @service    connection
// @name       database
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// @service    middleware
// @name       all
app.use(cors());
app.use(express.json());

// @service    main route
// @name       api
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

// @service    listening
// @name       server port
app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});
