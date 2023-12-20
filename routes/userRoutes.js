const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getSingleUser);
router.get("/:id/children", userController.getChildrenOfParent);
router.post("/:id/child", userController.getChildDetails);
router.post("/:id", userController.createChild);

module.exports = router;