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

//getting a sepcific pizza by ID
router.post("/getpizzabyid", async (req, res) => {
	const pizzaid = req.body.pizzaid;
	console.log(pizzaid);
	try {
		const pizza = await Pizza.findOne({ _id: pizzaid });
		res.status(200).json(pizza);
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "error.message",
		});
	}
});

//ediditing the pizza details
router.post("/editpizza", async (req, res) => {
	// const editedPizza = req.body.editedpizza;
	const editedpizza = req.body.editedpizza;
	// console.log("This is edited pizza", editedpizza);
	try {
		var pizza = await Pizza.findOne({ _id: editedpizza._id });
		(pizza.name = editedpizza.name),
			(pizza.description = editedpizza.description),
			// (pizza.image[0] = editedpizza.image),
			(pizza.category = editedpizza.category),
			(pizza.prices = [editedpizza.prices]);

		await pizza.save();

		res.send("Pizza Details Edited successfully");
	} catch (err) {
		console.error(err.message);
		res.status(400).send(err);
	}
});

module.exports = router;
