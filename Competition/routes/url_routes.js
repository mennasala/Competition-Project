const router = require("express").Router();
const Url = require("../app/controller/url_controller");

const auth = require("../app/midleware/auth_midleware");
const role_auth = require("../app/midleware/role_midleware");

router.post("/addUrl",auth,role_auth, Url.addUrl);

module.exports = router;
