const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http").Server(app);
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const routes = require("./routes");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

// app.listen(80, '0.0.0.0', () => {
//   console.log('Server running on http://159.65.153.167');
// });
const mongoose = require("mongoose");
const database = process.env.DB_CONNECT;

mongoose
  .connect("mongodb+srv://mehaksandhu713:OBmsTHDgAjdn1mHv@bhagwant1.gqjjddb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST;
    http.listen(PORT, HOST, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
