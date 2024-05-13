const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Route to serve the index.html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to handle timestamp requests
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  // Function to validate date
  const isValidDate = (dateString) => {
    return !isNaN(new Date(dateString).getTime());
  };

  // If date is not provided, return current time
  if (!date) {
    const currentTime = new Date();
    res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });
    return;
  }

  let inputDate = new Date(date);
  
  // If input date is invalid, return error
  if (!isValidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Return timestamp and UTC string
  res.json({ unix: inputDate.getTime(), utc: inputDate.toUTCString() });
});

// Start the server
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
