
const express = require("express");
const userControllers = require("./../controllers/userControllers");



const router = express.Router();



//ROUTER USERS
router.route("/").get(userControllers.getAllUsers).post(userControllers.createUsers);
router.route("/:id").get(userControllers.getSingleUsers).patch(userControllers.updateUsers).delete(userControllers.deleteUsers);


module.exports = router;