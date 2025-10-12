import express from "express";
import {
  getContacts,
  submitContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/submitcontact", submitContact);

router.get("/getcontacts", getContacts);

export default router;
