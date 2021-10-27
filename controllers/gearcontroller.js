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
                 acItemFive,
                 shield 
                

            } = req.body.gear
         await Gear.create({
            acItem, 
            acItemTwo,
            acItemThree,
            acItemFour,
            acItemFive,
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

router.get('/mine', validateJWT, async (req,res) => {
    try {
        Gear.findAll({
            where: { 
                userId: req.user.id
            }

        })
        .then((gea) => {
            res.status(200).json(gea)
        })
    }catch (error) {
        res.status(500).json({
            message: 'gear not found'
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
            acItemFive: a.acItemFive,
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

router.delete("/:id", validateJWT, async (req, res) => {
    const GearID = req.params.id
    const userId = req.user.id
    console.log(GearID, userId)
    try{ 
    const query = {
        where: {id: GearID, userId}
    };
    let itemsRemoved = await Gear.destroy(query)

    if (itemsRemoved){
        res.status(200).json({
            message: 'Gear Removed'
        })
    } else {
        res.status(404).json({
            message: "Info not found"
        }); console.log(error)
    } 
     } catch (error) {
        res.status(500).json({
    message: `Error: {$error}`
});    
    }

});

router.put("/update/:id", validateJWT, async (req, res) => {
   try {
     let GearID = req.params.id;
     let {
        acItem,
        acItemTwo,
        acItemThree,
        acItemFour,
        acItemFive,
        shield
     } = req.body.gear;

   let query = {
       where: { 
           id: GearID
       }
   }

   let updatedGear = {
    acItem,
    acItemTwo,
    acItemThree,
    acItemFour,
    acItemFive,
    shield,
   } = req.body.gear

   let GearsUpdated = await Gear.update(updatedGear, query);

   if (GearsUpdated) res.status(200).json({message: `Gear at id:${GearID} is updated`, GearsUpdated})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;