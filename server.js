const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 8000;

require('dotenv').config({path: './config/.env'})

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
  connectDB()
  

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  });
  
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/register', (req,res) => {
    const { username, password, confirmPassword } = req.body
    res.send({username, password, confirmPassword})
});