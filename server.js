const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


//Routes

const app = express();

// Middlewares



//Routes




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