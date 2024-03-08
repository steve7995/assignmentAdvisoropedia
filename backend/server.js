const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const userRouter = require('./routes/userRoutes')
// Middlewares 
app.use(express.json());
app.use(cors())
//routes
app.use('/api',userRouter)

//database connection 
const dbConnection = async()=>{
try {
  await mongoose.connect(process.env.MONGODB_URI, {
  });
  console.log('Connected to MongoDB Successfully');
} catch (error) {
  console.error('Error connecting to the database:', error);
}

}
dbConnection();


app.listen(port, () => {
  console.log(`Server is running on the  port ${port}`);
    });