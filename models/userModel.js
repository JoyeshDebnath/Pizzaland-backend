const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required to be provided!"],
		},
		password: {
			type: String,
			required: [true, "Please Provide the password!"],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userSchema);
