const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const EmplpyeeModel = require("./models/Employee")

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


  app.post('/login', (req, res) => {
    const { email, password  } = req.body;

    EmplpyeeModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      res.json({message:"Success", user : { name : user.name ,email: user.email} });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });

    // ... rest of the code
  });



  app.post('/register', (req, res) => {
    EmplpyeeModel.create(req.body)
      .then(user => {
        console.log("✅ New user created:", user);
        res.status(201).json({ message: 'User registered successfully', user });
      })
      .catch(err => {
        console.error("❌ Error:", err);
        res.status(400).json({ error: err.message });
      });
  });
  
  app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
  });




// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
