const express = require("express");
const router = express.Router();


const employees = [
    { id: 1, name: "Om Makwana", position: "Software Engineer" },
    { id: 2, name: "Vivek Mishra", position: "Project Manager" },
    { id: 3, name: "Jyoti Shah", position: "HR Manager" }
];

// GET: Fetch all employees
router.get("/", (req, res) => {
    res.json({
        message: "Employee API called...",
        data: employees
    });
});

// GET: Fetch a specific employee by ID
router.get("/:id", (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (employee) {
        res.json({ message: "Employee found", data: employee });
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});

// Export the router
module.exports = router;
