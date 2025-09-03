const express=require("express");
const petsRoutes=require("./routes/pets");
require("dotenv").config();
const connectDB=require("./config/db");
connectDB();
const cors=require("cors");
app.use(cors());
const app=express();
const port=process.env.PORT||5000;
app.use(express.json());
//routes
app.use("/api/pets",petsRoutes);
//error handling middleware
app.use((err,req,res,next)=>{console.error(err.stack);
    res.status(500).json({message:"something went wrong!"});
});

app.listen(port,()=>{console.log(`server is running on http://localhost:${port}`);});