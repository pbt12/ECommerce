const express = require("express");
const router = express.Router();
const authenticateToken = require("../utils/authenticateToken");
const eachProductDetails = require("../models/eachProductDetails");

const categories = [
  "",
  "Clothes",
  "Electronics",
  "Appliances",
  "Grocery",
  "Toys",
];

router.get("/", authenticateToken, async (request, response) => {
  let {
    sort_by,
    category = 0,
    title_search = "",
    rating = "0",
  } = request.query;
  if (rating === "") {
    rating = 0;
  } else {
    rating = parseInt(rating);
  }
  let order;
  if (sort_by === "PRICE_HIGH") {
    order = -1;
  } else {
    order = 1;
  }
  let regex = new RegExp(`${title_search}`, "i");
  let regex2 = new RegExp(categories[parseInt(category)], "i");
  const object = {
    title: { $regex: regex },
    rating: { $gte: rating },
    image_url: { $regex: regex2 },
  };
  console.log(object);
  let result = await eachProductDetails
    .find()
    .where(object)
    .sort({ price: order });
  response.status(200);
  response.send({
    products: result,
    total: result.length,
  });
});

router.get("/:id", authenticateToken, async (request, response) => {
  const { id } = request.params;
  let result = await eachProductDetails.find({ id: parseInt(id) });

  response.status(200);
  response.send(result[0]);
});

router.post("/", async (request, response) => {
  const data = request.body;
  let result = await eachProductDetails.create(data);
});

module.exports = router;
