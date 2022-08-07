require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const connectToMongo = require("./db");
const port = process.env.PORT || 4001
const cors = require("cors");
const v1Routes = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", v1Routes);


  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
    connectToMongo();
  });