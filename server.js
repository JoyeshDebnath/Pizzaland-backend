const express = require("express");
const db = require("./db");
const pizza = require("./models/PizzaModel");
const userRoute = require("./routes/userRoute");
const pizzasRoute = require("./routes/pizzasRoute");
const app = express();

app.use(express.json());

app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => `server is listening on port  ${port}`);
