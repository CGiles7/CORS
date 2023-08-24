const express = require("express");
const cors = require("cors");
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const corsOptions = {
  origin: "*",
};

const router = express.Router();

router
  .route("/")
  .options((req, res) => {
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.status(204).end();
  })
  .get(cors(corsOptions), controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:userId")
  .options((req, res) => {
    res.header("Access-Control-Allow-Methods", "GET"); // Only allow GET method in OPTIONS
    res.header("Access-Control-Allow-Origin", "*");
    res.status(204).end();
  })
  .get((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }, controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);


module.exports = router;