const mongoose = require("mongoose");
const CounterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id:{type:String,required:true},
  seq: { type: Number, default: 0 },
});
module.exports = mongoose.model("counter", CounterSchema);
