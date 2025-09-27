import Contact from "../models/contact.js";

// Save contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({ message: " Message submitted successfully" });
  } catch (error) {
    console.error("Contact error:", error);
    res.json({ error: error.message });
  }
};

// Get all messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.json({ error: "Failed to fetch messages" });
  }
};
