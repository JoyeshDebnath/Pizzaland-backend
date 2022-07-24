const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orderModel");

//place order route ...
router.post("/placeorder", async (req, res) => {
	const { token, subTotal, currentUser, cartItems } = req.body;
	console.log(currentUser);
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
			console.log("Payment ID:", payment.id);
			const newOrder = new Order({
				name: currentUser.name,
				email: currentUser.email,
				userid: currentUser._id,
				orderItems: cartItems,
				orderAmount: subTotal,
				shippingAddress: {
					street: token.card.address_line1,
					city: token.card.address_city,
					country: token.card.address_country,
					pincode: token.card.address_zip,
				},
				transactionId: payment.id,
			});

			newOrder.save();

			res.status(200).json({
				newOrder,
				msg: "Payment successful",
			});
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

//get User Orders Routres ....

router.post("/getuserorders", async (req, res) => {
	const { userid } = req.body;
	try {
		const orders = await Order.find({ userid: userid });
		res.send(orders);
	} catch (error) {
		return res.status(404).json({
			msg: "Something went wrong...",
			error,
		});
	}
});

module.exports = router;
