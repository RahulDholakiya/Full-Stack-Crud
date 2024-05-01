import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
} from "../controllers/AdminController.js";

const router = express.Router();

router.post("/", createAdmin);
router.get("/showUser", getAdmin);
router.get("/showUser/:id", getAdminById);
router.put("/updateUser/:id", updateAdmin);
router.delete("/deleteUser/:id", deleteAdmin);

export default router;
