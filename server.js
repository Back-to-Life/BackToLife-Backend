const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')



// Load env vars
dotenv.config({ path: './config/config.env' });


// Connect to database
connectDB();





// Route files
const users = require('./routes/users');
const auth = require('./routes/auth');
const login = require('./routes/login')
const point = require('./routes/point')



const app = express();

// Body parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())

app.use(logger)






// Mount routers
app.use('/users', users)
app.use('/logins',login)
app.use('/points',point)
app.use('/', auth);








const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );


