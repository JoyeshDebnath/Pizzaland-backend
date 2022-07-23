const express = require("express");
const db = require("./db");
const pizza = require("./models/PizzaModel");
const userRoute = require("./routes/userRoute");
const pizzasRoute = require("./routes/pizzasRoute");
const ordersRoute = require("./routes/ordersRoute");
const app = express();

app.use(express.json());

app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", ordersRoute);

const port = process.env.PORT || 5000;
// console.log("Process.env", process.env.PORT);
app.listen(port, () => `server is listening on port  ${port}`);
