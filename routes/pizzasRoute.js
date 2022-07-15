const express = require("express");
const router = express.Router();
const Pizza = require("../models/PizzaModel");

router.get("/getallpizzas", async (req, res) => {
	try {
		const pizzas = await Pizza.find({});
		res.status(200).send(pizzas);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

module.exports = router;
