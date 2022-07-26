const express = require("express");
const router = express.Router();
const Pizza = require("../models/PizzaModel");
//get all pizzas routes
router.get("/getallpizzas", async (req, res) => {
	try {
		const pizzas = await Pizza.find({});
		res.status(200).send(pizzas);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

//add a new pizzas (admin)
router.post("/addpizza", async (req, res) => {
	const pizza = req.body.pizza;
	try {
		const newPizza = new Pizza({
			name: pizza.name,
			image: pizza.image,
			varients: ["small", "medium", "large"],
			description: pizza.description,
			category: pizza.category,
			prices: [pizza.prices],
		});

		await newPizza.save();
		res.status(202).json({
			newPizza,
		});
	} catch (error) {
		res.status(400).json({
			msg: "something went wrong!",
			error,
		});
	}
});

module.exports = router;
