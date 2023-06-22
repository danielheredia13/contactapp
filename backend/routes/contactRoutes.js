import express from "express";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controllers/contactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createContact);
router.route("/user/:id").get(protect, getContacts);
router
  .route("/:id")
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

export default router;
