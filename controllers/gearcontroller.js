const express = require("express");
const router = express.Router();
const { Gear } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 acItem,
                 acItemTwo,
                 acItemThree,
                 acItemFour,
                 asItemFive,
                 shield 
                

            } = req.body.gear
         await Gear.create({
            acItem, 
            acItemTwo,
            acItemThree,
            acItemFour,
            asItemFive,
            shield, 
            userId: req.user.id
         })

         res.status(200).json({
             message: "Gear Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Gears =  await Gear.findAll()
     const GearsRet = Gears.map(a => {
         return {
            id: a.id,
            acItem: a.acItem,
            acItemTwo: a.acItemTwo,
            acItemThree: a.acItemThree,
            acItemFour: a.acItemFour,
            asItemFive: a.acItemFive,
            shield: a.shield, 
         }
     })
       res.status(200).json({
        Gears: Gears,   
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
    const GearID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: GearID, userId}
    }
    let itemsRemoved = await Gear.destroy(query)

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
     const GearID = req.params.id
     const {
        acItem,
        acItemTwo,
        acItemThree,
        acItemFour,
        asItemFive,
        shield
     } = req.body.gear

   const query = {
       where: { 
           id: GearID
       }
   }

   const updatedGear = {
    acItem,
    acItemTwo,
    acItemThree,
    acItemFour,
    asItemFive,
    shield
   }

   const GearsUpdated = await Gear.update(Gear, query)

   if (GearsUpdated) res.status(200).json({message: `Gear at id:${GearID} is updated`, updatedGear})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;