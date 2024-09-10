require("dotenv").config();
const express = require("express");
const app = express(); //The Application object handles important tasks such as handling HTTP requests, rendering HTML views, and configuring middleware etc.


const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const routes = require("./routes");

const database = process.env.DB_CONNECT;

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.1.2:5000", 
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes); // use routes

const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secret_key);

app.post("/payment-sheet", async (req, res) => {
  try {
    // Retrieve customer
    const customer = await stripe.customers.create({
      email: req.body.email, // Provide the email of the customer
      name: req.body.name, // Optionally provide the name of the customer
      // You can include additional fields as required
  });
    if (!customer) {
      return res.status(400).json({ error: "No customer found" });
    }
    

    // Create ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-04-10" }
    );

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, // Sample amount in cents (e.g., $10.99)
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      // Include shipping details if applicable
      shipping: req.body.shipping, // Assuming you pass shipping details in the request body
    });

    // Return payment sheet parameters
    return res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error("Error fetching payment sheet parameters:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


mongoose.set("useCreateIndex", true);
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5001;
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
