const router = require("express").Router();
const controller = require("./plants.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

// Set up CORS options
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

let currentId = 1;

function nextId() {
  const id = currentId.toString();
  currentId++;
  return id;
}

router.route("/").options(cors(corsOptions));

router
  .route("/")
  .get(cors(corsOptions), controller.list)
  .post(cors(corsOptions), controller.create)
  .put(cors(corsOptions), (req, res) => {
    res.status(405).json({ error: "Method Not Allowed" }); // Send JSON response with error
  })
  .all(methodNotAllowed);

router
  .route("/:plantId")
  .get(cors(corsOptions), controller.read)
  .put(cors(corsOptions), controller.update)
  .delete(cors(corsOptions), controller.delete)
  .post(cors(corsOptions), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(405).send();
  })
  .all(methodNotAllowed);

module.exports = router;
