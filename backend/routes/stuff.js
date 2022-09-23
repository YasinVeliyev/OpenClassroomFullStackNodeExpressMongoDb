const express = require("express");
const stuffCtrl = require("../controllers/stuffCtrl");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");

router.route("/").get(stuffCtrl.getAllThings).post(multer, stuffCtrl.createThing);

router.route("/:thingId").get(stuffCtrl.getOneThing).put(multer, stuffCtrl.modifyThing).delete(stuffCtrl.deleteThing);

module.exports = router;
