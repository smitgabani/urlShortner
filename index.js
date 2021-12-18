const PORT = process.env.PORT || 8000;

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// middleware to allow express to use json
app.use(express.json({extented: false}));


connectDB();

// 
//

// routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)});