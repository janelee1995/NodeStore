var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String
});

var categoriesModel = mongoose.model('categories', categorySchema);

module.exports = categoriesModel;
