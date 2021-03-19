const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')




// Load env vars
dotenv.config({ path: './config/config.env' });


// Connect to database
connectDB();

// Route files
const users = require('./routes/users');
const auth = require('./routes/auth');


const app = express();

// Body parser
app.use(express.json())



app.use(logger)

// Mount routers
app.use('/', users);
app.use('/', auth);




const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );


