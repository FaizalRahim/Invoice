const express = require('express');
const mongoose = require('mongoose');
const cors = require ("cors");
require('dotenv').config();


const clientRoutes = require('./routes/clientRoute');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());



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