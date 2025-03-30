const ContactModel = require("../models/ContactModel");


const addContact = async (req, res) => {
  try {
    const savedContact = await ContactModel.create(req.body);
    res.status(201).json({
      message: "Contact message submitted successfully",
      data: savedContact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    if (contacts.length === 0) {
      res.status(404).json({ message: "No contact messages found" });
    } else {
      res.status(200).json({
        message: "Contact messages retrieved successfully",
        data: contacts,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getContactById = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "No contact message found" });
    } else {
      res.status(200).json({
        message: "Contact message retrieved successfully",
        data: contact,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteContact = async (req, res) => {
  try {
    const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      res.status(404).json({ message: "No contact message found to delete" });
    } else {
      res.status(200).json({
        message: "Contact message deleted successfully",
        data: deletedContact,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addContact, getAllContacts, getContactById, deleteContact };
