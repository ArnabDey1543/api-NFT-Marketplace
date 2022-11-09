
const express = require("express");

/// -----------USERS
const getAllUsers = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  const createUsers = (req, res) => {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
  };
  const getSingleUsers = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  const updateUsers = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  const deleteUsers = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  


const router = express.Router();



//ROUTER USERS
router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id").get(getSingleUsers).patch(updateUsers).delete(deleteUsers);


module.exports = router;