// Importing the required modules
const express = require("express");
const candidates = require("./candidates"); // Importing candidates data from a separate file
const app = express(); // Creating an instance of the express application
const port = 5000; // Defining the port number for the server
const cors = require("cors"); // Import the CORS package

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // This will enable CORS for all routes

// Defining the route to get the candidates data
app.get("/api/candidates", (req, res) => {
  try {
    // Checking if the candidates data is available
    if (!candidates)
      return res
        .status(400) // If no candidates data is found, respond with a 400 status
        .json({ status: false, message: "Candidates Data not found" });

    // If candidates data is found, respond with the data and a success message
    res.status(200).json({
      status: true,
      candidates: candidates,
      message: "Candidates Data Found",
    });
  } catch (error) {
    // Handling any unexpected errors and responding with a 500 status
    res
      .status(500)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
});

// Defining the root route to check if the server is running
app.get("/", (req, res) => {
  res.send(`Server is running on ${port}`);
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on ${port}`); // Logging when the server starts
});
