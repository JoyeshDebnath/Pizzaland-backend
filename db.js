const mongoose = require("mongoose");
require("dotenv").config();

var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on(`connected`, () => {
	console.log(`mongo db connection successfully created`);
});

db.on(`error`, () => {
	console.log(`mongo db connection failed !!!`);
});

module.exports = mongoose;
