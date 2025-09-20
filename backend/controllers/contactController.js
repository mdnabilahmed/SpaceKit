import Contact from "../models/contact.js";

// Save contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "✅ Message submitted successfully" });
  } catch (error) {
    console.error("Contact error:", error); // <-- logs exact error
    res.status(500).json({ error: error.message }); // <-- send real error to frontend
  }
};

// Get all messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
