require("dotenv").config();

const cors = require("cors");
const express = require('express');
const app = express();
const authRoutes = require("./routes/authRoutes");
const connectToMongo = require('./db');

const port = 8181 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, async() => {
    await connectToMongo(process.env.MONGO_URI);
    console.log(`Server Alive On http:localhost:${port}`);
});
