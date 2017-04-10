var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    name: String,
    amount: Number,
    description: String,
    paidby: String,
    productOwner: String,
    date: {type: Date, default: Date.now}
});

var paymentsModel = mongoose.model('payment', paymentSchema);

module.exports = paymentsModel;
