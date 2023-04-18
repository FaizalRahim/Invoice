const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


//Routes
const clientRoutes = require('./routes/clientRoute');
const app = express();

// Middlewares



//Routes
app.use('/api', clientRoutes);



// Connect to DB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));