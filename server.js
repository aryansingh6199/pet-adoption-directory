const express=require("express");
const cors=require("cors");
const app=express();
const port=5000;
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{res.send("Pet Adoption API is running");});
app.get("/api/pets",(req,res)=>{res.json([{
    id:1,name:"Tommy",age:3},
    {id:2,name:"Lucy",age:2}]);
});
app.listen(port,()=>{console.log(`server running on http://localhost:${port}`);});