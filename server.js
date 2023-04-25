const express = require('express');
const mongoose = require('mongoose');
const cors = require ("cors");
require('dotenv').config();


const clientRoutes = require('./routes/clientRoute');
const productRoutes = require('./routes/productRoute');
const invoiceRoutes = require('./routes/invoiceRoute');
const emailRoutes = require('./routes/emailRoute');
const userRoutes = require('./routes/userRoute')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());



//Routes
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/users', userRoutes);



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