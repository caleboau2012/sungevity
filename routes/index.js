var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Sungevity" });
});

router.get("/last-25-stories", controllers.last25Stories);
router.get("/last-week", controllers.lastWeek);
router.get("/users-with-10000-karma", controllers.usersWith10000Karma);

module.exports = router;
