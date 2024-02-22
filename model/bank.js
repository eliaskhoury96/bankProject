const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const bankSchema = new Schema({
  amount: { type: Number, require: true },
  category: { type: String, require: true },
  vendor: { type: String, require: true },
  month: { type: String, require: true}
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;

