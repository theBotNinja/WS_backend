const express = require("express");
//const debug = require("debug")("app:startup"); // set DEBUG=app:*
const helmet = require("helmet");
const ReportRoutes = require("./routes/ReportsRoutes.js")
const UserRoutes = require("./routes/UserRoutes.js")
const mongoose = require("mongoose")
require("dotenv").config();
const app = express();
const url = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
           
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};


app.use(helmet());
app.use(express.json());

app.use("/report",ReportRoutes);
app.use("/user",UserRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server runing on port ${PORT}`);
});
