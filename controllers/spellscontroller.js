const express = require("express");
const router = express.Router();
const { Spells } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                firstLevelSpells,
                secondLevelSpells,
                thirdLevelSpells,
                fourthLevelSpells,
                fifthLevelSpells,
                sixthLevelSpells,
                seventhLevelSpells,
                eigthLevelSpells,
                ninthLevelSpells,  

            } = req.body.spells
         await Spells.create({
            firstLevelSpells,
            secondLevelSpells,
            thirdLevelSpells,
            fourthLevelSpells,
            fifthLevelSpells,
            sixthLevelSpells,
            seventhLevelSpells,
            eigthLevelSpells,
            ninthLevelSpells,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Spell Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Spellss =  await Spells.findAll()
     const SpellssRet = Spellss.map(a => {
         return {
             id: a.id,
             firstLevelSpells: a.firstLevelSpells,
             secondLevelSpells: a.secondLevelSpells,
             thirdLevelSpells: a.thirdLevelSpells,
             fourthLevelSpells: a.fourthLevelSpells,
             fifthLevelSpells: a.fifthLevelSpells,
             sixthLevelSpells: a.sixthLevelSpells,
             seventhLevelSpells: a.seventhLevelSpells,
             eigthLevelSpells: a.eigthLevelSpells,
             ninthLevelSpells: a.ninthLevelSpells,
         }
     })
       res.status(200).json({
        Spellss: Spellss,   
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
    const SpellsID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: SpellsID, userId}
    }
    let itemsRemoved = await Spells.destroy(query)

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
     const SpellsID = req.params.id
     const {
        firstLevelSpells,
        secondLevelSpells,
        thirdLevelSpells,
        fourthLevelSpells,
        fifthLevelSpells,
        sixthLevelSpells,
        seventhLevelSpells,
        eigthLevelSpells,
        ninthLevelSpells,
     } = req.body.spells

   const query = {
       where: { 
           id: SpellsID
       }
   }

   const updatedSpells = {
    firstLevelSpells,
    secondLevelSpells,
    thirdLevelSpells,
    fourthLevelSpells,
    fifthLevelSpells,
    sixthLevelSpells,
    seventhLevelSpells,
    eigthLevelSpells,
    ninthLevelSpells,
   }

   const SpellssUpdated = await Spells.update(Spells, query)

   if (SpellssUpdated) res.status(200).json({message: `Spells at id:${SpellsID} is updated`, updatedSpells})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;