const express = require("express");
const db = require("./db");
const pizza = require("./models/PizzaModel");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is conncetd !!!");
});

app.get("/getallpizzas", (req, res) => {
	pizza.find({}, (err, docs) => {
		if (err) {
			return res.status(500).send(err);
		} else {
			// console.log(docs);
			res.status(200).send(docs);
		}
	});
});

const port = process.env.PORT || 5000;

app.listen(port, () => `server is listening on port  ${port}`);
