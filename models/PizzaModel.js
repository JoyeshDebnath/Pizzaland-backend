const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide the pizza name!!"],
		},
		varients: [],
		prices: [],
		category: {
			type: String,
			required: [true, "Please provide the pizza category !!"],
		},
		image: [
			{
				type: String,
				required: [true, "Please provide the pizza image !!!"],
			},
		],
		description: {
			type: String,
			required: [true, "Please provide the description of the pizza !!!"],
		},
	},
	{
		timestamps: true,
	}
);

const pizzaModel = mongoose.model("pizzas", pizzaSchema);
module.exports = pizzaModel;
