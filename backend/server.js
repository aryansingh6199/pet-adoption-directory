const express=require("express");
app.use(cors());
app.use(express.json());
const petsRoutes=require("./routes/pets");
require("dotenv").config();
const connectDB=require("./config/db");
connectDB();
const cors=require("cors");

const app=express();
const port=process.env.PORT||5000;

//routes
app.use("/api/pets",petsRoutes);
//error handling middleware
app.use((err,req,res,next)=>{console.error(err.stack);
    if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
    res.status(500).json({message:"something went wrong!"});
});

app.listen(port,()=>{console.log(`server is running on http://localhost:${port}`);});