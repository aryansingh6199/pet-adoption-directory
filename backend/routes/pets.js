const express=require("express");
const router=express.Router();
const pet=require("../models/pet");

router.get("/",(req,res)=>{res.json(pets);});
router.post("/",(req,res)=>{const newPet={id:pets.length+1,...req.body,};
pets.push(newPet);
res.status(201).json(newPet);
});
module.exports=router;