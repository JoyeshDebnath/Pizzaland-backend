const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//place order route ...
router.post("/placeorder", async (req, res) => {
	const { token, subTotal, currentUser, cartItems } = req.body;

	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		const payment = await stripe.paymentIntents.create(
			{
				amount: subTotal * 100,
				currency: "inr",
				customer: customer.id,
				receipt_email: token.email,
				payment_method_types: ["card"],
			},
			{
				idempotencyKey: uuidv4(),
			}
		);

		if (payment) {
			res.status(200).send("Payment done successFully!");
		} else {
			res.status(400).send("Payment Failed!");
		}
	} catch (error) {
		res.status(404).json({
			msg: error.message,
			status: "Error",
		});
	}
});

module.exports = router;
