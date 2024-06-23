const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); 
app.use(cors());

// Routes
app.use('/', productRoutes);

// Root route to show MongoDB connection status
app.get('/', (req, res) => {
  res.send('MongoDB is now connected');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
