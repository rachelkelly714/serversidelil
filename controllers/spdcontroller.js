const express = require("express");
const router = express.Router();
const { SpellsPerDay } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 firstLevelSpellsLeft,
                 secondLevelSpellsLeft,
                 thirdLevelSpellsLeft,
                 fourthLevelSpellsLeft,
                 fifthLevelSpellsLeft,
                 sixthLevelSpellsLeft,
                 seventhLevelSpellsLeft,
                 eigthLevelSpellsLeft,
                 ninthLevelSpellsLeft, 
                

            } = req.body.spellsperday
         await SpellsPerDay.create({
            firstLevelSpellsLeft,
            secondLevelSpellsLeft,
            thirdLevelSpellsLeft,
            fourthLevelSpellsLeft,
            fifthLevelSpellsLeft,
            sixthLevelSpellsLeft,
            seventhLevelSpellsLeft,
            eigthLevelSpellsLeft,
            ninthLevelSpellsLeft,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Spellpd Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const SpellsPerDays =  await SpellsPerDay.findAll()
     const SpellsPerDaysRet = SpellsPerDays.map(a => {
         return {
            id: a.id,
            firstLevelSpellsLeft: a.firstLevelSpellsLeft,
            secondLevelSpellsLeft: a.secondLevelSpellsLeft,
            thirdLevelSpellsLeft: a.thirdLevelSpellsLeft,
            fourthLevelSpellsLeft: a.fourthLevelSpellsLeft,
            fifthLevelSpellsLeft: a.fifthLevelSpellsLeft,
            sixthLevelSpellsLeft: a.sixthLevelSpellsLeft,
            seventhLevelSpellsLeft: a.seventhLevelSpellsLeft,
            eigthLevelSpellsLeft: a.eigthLevelSpellsLeft,
            ninthLevelSpellsLeft: a.ninthLevelSpellsLeft,
         }
     })
       res.status(200).json({
        SpellsPerDays: SpellsPerDays,   
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
    const SpellsPerDayID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: SpellsPerDayID, userId}
    }
    let itemsRemoved = await SpellsPerDay.destroy(query)

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
     const SpellsPerDayID = req.params.id
     const {
        firstLevelSpellsLeft,
        secondLevelSpellsLeft,
        thirdLevelSpellsLeft,
        fourthLevelSpellsLeft,
        fifthLevelSpellsLeft,
        sixthLevelSpellsLeft,
        seventhLevelSpellsLeft,
        eigthLevelSpellsLeft,
        ninthLevelSpellsLeft,
     } = req.body.spellsperday

   const query = {
       where: { 
           id: SpellsPerDayID
       }
   }

   const updatedSpellsPerDay = {
    firstLevelSpellsLeft,
    secondLevelSpellsLeft,
    thirdLevelSpellsLeft,
    fourthLevelSpellsLeft,
    fifthLevelSpellsLeft,
    sixthLevelSpellsLeft,
    seventhLevelSpellsLeft,
    eigthLevelSpellsLeft,
    ninthLevelSpellsLeft,
   }

   const SpellsPerDaysUpdated = await SpellsPerDay.update(SpellsPerDay, query)

   if (SpellsPerDaysUpdated) res.status(200).json({message: `SpellsPerDay at id:${SpellsPerDayID} is updated`, updatedSpellsPerDay})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;