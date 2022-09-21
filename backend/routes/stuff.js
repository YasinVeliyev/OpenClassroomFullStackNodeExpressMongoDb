const express = require("express");
const stuffCtrl = require("../controllers/stuffCtrl");

const router = express.Router();

router.route("/").get(stuffCtrl.getAllThings).post(stuffCtrl.createThing);

router.route("/:thingId").get(stuffCtrl.getOneThing).put(stuffCtrl.modifyThing).delete(stuffCtrl.deleteThing);

module.exports = router;
