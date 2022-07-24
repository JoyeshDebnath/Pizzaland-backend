const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		userid: {
			type: String,
			required: true,
		},
		orderItems: [],
		shippingAddress: {
			type: Object,
		},
		orderAmount: {
			type: Number,
			required: true,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		transactionId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("orders", orderSchema);
