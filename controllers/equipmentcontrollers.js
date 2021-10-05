const express = require("express");
const router = express.Router();
const { Equipment } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 item,
                 itemTwo,
                 itemThree,
                 itemFour,
                 itemFive,
                 itemSix,
                

            } = req.body.equipment
         await Equipment.create({
            item,
            itemTwo,
            itemThree,
            itemFour,
            itemFive,
            itemSix,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Equipment Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Equipment not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Equipments =  await Equipment.findAll()
     const EquipmentsRet = Equipments.map(a => {
         return {
            id: a.id,
            item: a.item,
            itemTwo: a.itemTwo,
            itemThree: a.itemThree,
            itemFour: a.itemFour,
            itemFive: a.itemFive,
            itemSix: a.itemSix
         }
     })
       res.status(200).json({
        Equipments: Equipments,   
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
    const EquipmentID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: EquipmentID, userId}
    }
    let itemsRemoved = await Equipment.destroy(query)

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
     const EquipmentID = req.params.id
     const {
        item,
        itemTwo,
        itemThree,
        itemFour,
        itemFive,
        itemSix,
     } = req.body.equipment

   const query = {
       where: { 
           id: EquipmentID
       }
   }

   const updatedEquipment = {
    item,
    itemTwo,
    itemThree,
    itemFour,
    itemFive,
    itemSix,
   }

   const EquipmentsUpdated = await Equipment.update(Equipment, query)

   if (EquipmentsUpdated) res.status(200).json({message: `Equipment at id:${EquipmentID} is updated`, updatedEquipment})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;