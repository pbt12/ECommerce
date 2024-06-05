const express = require("express");
const userDetails = require("../models/userDetails");
const router = express.Router();

router.get("/:username/", async (request, response) => {
  const { username } = request.params;
  let result = await userDetails.find({ username: username });
  response.status(200);
  response.send(result);
});

router.get("/mails/:mailId", async (request, response) => {
  const { mailId } = request.params;
  let result = await userDetails.find({ mailId: mailId });
  response.status(200);
  response.send(result);
});

module.exports = router;
