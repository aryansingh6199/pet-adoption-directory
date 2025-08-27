const express=require("express");
const router=express.Router();
//dummy data
let pets=[{id:1,name:"Tommy",type:"dog"},
    {id:2,name:"Lucy",type:"cat"},
];
router.get("/",(req,res)=>{res.json(pets);});
router.post("/",(req,res)=>{const newPet={id:pets.length+1,...req.body,};
pets.push(newPet);
res.status(201).json(newPet);
});
module.exports=router;