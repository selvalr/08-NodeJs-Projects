const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

//View All recors
router.get("/", studentController.view);
//add new records

router.get("/adduser", studentController.adduser);

//save new record
router.post("/adduser", studentController.save);

//Update Records
//save new record
router.get("/edituser/:id", studentController.editUser);
router.post("/edituser/:id", studentController.edit);

//delete records
router.get("/deleteuser/:id", studentController.delete);

module.exports = router;
