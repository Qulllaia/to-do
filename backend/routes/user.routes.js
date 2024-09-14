const Router = require("express");
const router = new Router();
const userController = require("../controller/user.contoller");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/reg", userController.registrateUser);
router.post("/login", userController.loginUser);
router.get("/user", userController.getUser);
router.post("/logout", userController.logoutUser);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
