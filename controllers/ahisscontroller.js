const express = require("express");
const router = express.Router();
const { Ahiss } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 armorClass,
                 initiative,
                 healthPoints,
                 speed,
                 fortitude,
                 will,
                 reflex
                 
                

            } = req.body.ahiss
         await Ahiss.create({
            armorClass,
            initiative,
            healthPoints,
            speed,
            fortitude,
            will,
            reflex,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Info Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Ahisss =  await Ahiss.findAll()
     const AhisssRet = Ahisss.map(a => {
         return {
            id: a.id,
            armorClass: a.armorClass,
            initiative: a.initiative,
            healthPoints: a.healthPoints,
            speed: a.speed,
            fortitude: a.fortitude,
            will: a.will,
            reflex: a.reflex
            
         }
     })
       res.status(200).json({
        Ahisss: Ahisss,   
       message: "Success!"
       })
   } catch (error) {
       res.status(500).json({
       message: `Data not found ${error}`
       })
   }


})

router.delete("/delete/:id", validateJWT, async (req, res) => {
    try{ 
    const AhissID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: AhissID, userId}
    }
    let itemsRemoved = await Ahiss.destroy(query)

    if (itemsRemoved){
        res.status(200).json({
            message: 'Info Removed'
        })
    } else {
        res.status(404).json({
            message: "Info not found"
        })
    } 
     } catch (error) {
        res.status(500).json({
    message: `Error: {$error}`
})    
    }

})

router.put("/update/:id", validateJWT, async (req, res) => {
   try {
     const AhissID = req.params.id
     const {
        armorClass,
        initiative,
        healthPoints,
        speed,
        fortitude,
        will,
        reflex
     } = req.body.ahiss

   const query = {
       where: { 
           id:AhissID
       }
   }

   const updatedAhiss = {
    armorClass,
    initiative,
    healthPoints,
    speed,
    fortitude,
    will,
    reflex
   }

   const AhissUpdated = await Ahiss.update(Ahiss, query)

   if (AhissUpdated) res.status(200).json({message: `Ahiss at id:${AhissID} is updated`, updatedAhiss})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;