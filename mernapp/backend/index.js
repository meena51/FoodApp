const express = require('express');
const app = express();
const port = 5000;
const connectDB = require("./db");

// Connect to MongoDB
connectDB();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
// Middleware - You need to provide a middleware function here
app.use(express.json());

// Routes
app.use('/api', require("./Routes/CreateUser"));
//Route to display
app.use('/api', require("./Routes/DisplayData"));
// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
