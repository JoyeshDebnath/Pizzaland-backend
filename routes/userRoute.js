const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const newUser = new User({
		name,
		email,
		password,
	});
	try {
		newUser.save();
		res.status(202).send("new user registered successfully!!");
	} catch (err) {
		return res.status(400).json({
			err,
		});
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.find({ email, password });
		if (user.length > 0) {
			const currentUser = {
				name: user[0].name,
				email: user[0].email,
				isAdmin: user[0].isAdmin,
				_id: user[0]._id,
			};
			res.status(200).send(currentUser);
		} else {
			return res.status(400).json({ message: "user login failed !!" });
		}
	} catch (err) {
		return res.status(400).json({
			message: "Something went wrong!",
			err,
		});
	}
});

router.get("/getallusers", async (req, res) => {
	try {
		const users = await User.find({});
		console.log(users);
		res.send(users);
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

router.post("/deleteuser", async (req, res) => {
	const userid = req.body.userid;

	try {
		await User.findOneAndDelete({ _id: userid });
		res.send("User Deleted Successfully");
	} catch (error) {
		return res.status(400).json({ message: error });
	}
});

module.exports = router;
