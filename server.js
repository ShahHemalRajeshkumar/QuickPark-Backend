const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import employee routes
const employeeRoutes = require("./employees");
app.use("/employees", employeeRoutes);

// Test API
app.get("/test", (req, res) => {
    console.log("test API called...");
    res.send("Hello, test API called...");
});

// Users API
app.get("/users", (req, res) => {
    res.json({
        message: "User API called...",
        data: ["Ram", "Shyam", "Seeta"]
    });
});

// Server creation
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server started on port number", PORT);
});
