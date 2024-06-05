const mongoose = require("mongoose");
const counter = require("./counter");

const eachProductDetails = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: [true, "Title is Required"] },
    brand: {
      type: String,
      required: [true, "Brand is Required"],
    },
    price: { type: Number, required: [true, "Price is Required"] },
    image_url: { type: String, required: [true, "Image URL is Required"] },
    rating: { type: Number, default: 3 },
    id: {
      type: Number,
    },
    availability: {
      type: String,
      required: [true, "Availability status is Required"],
    },
    total_reviews: {
      type: Number,
      required: [true, "total_reviews is required "],
    },
    description: {
      type: String,
      required: true,
    },
    similar_products: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

eachProductDetails.pre("save", function (next) {
  var doc = this;
  counter.findByIdAndUpdate(
    { id: "productId" },
    { $inc: { seq: 1 } },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
});

module.exports = mongoose.model("eachProductDetails", eachProductDetails);
