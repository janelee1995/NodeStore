var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	imageURL: String,
	username: String,
	category: String,
	date: {type: Date, default: Date.now}
});

var productsModel = mongoose.model('product', productsSchema);

module.exports = productsModel;
