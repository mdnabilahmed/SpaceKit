import express from "express";
import { getContacts } from "../controllers/contactController.js";
import { submitContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/submitcontact", submitContact);
router.get("/getcontacts", getContacts);

export default router;
