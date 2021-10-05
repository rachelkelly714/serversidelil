const express = require("express");
const router = express.Router();
const { Specs } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 strength,
                 strengthModifier,
                 dexterity,
                 dexterityModifier,
                 constitution,
                 conModifier,
                 intelligence,
                 intModifier,
                 wisdom,
                 wisModifier,
                 charisma,
                 charModifier, 
                 
                

            } = req.body.specs
         await Specs.create({
            strength,
            strengthModifier,
            dexterity,
            dexterityModifier,
            constitution,
            conModifier,
            intelligence,
            intModifier,
            wisdom,
            wisModifier,
            charisma,
            charModifier, 
            userId: req.user.id
         })

         res.status(200).json({
             message: "Abilities Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Specss =  await Specs.findAll()
     const SpecssRet = Specss.map(a => {
         return {
             id: a.id,
             strength: a.strength,
            strengthModifier: a.strengthModifier,
            dexterity: a.dexterity,
            dexterityModifier: a.dexterityModifier,
            constitution: a.constitution,
            conModifier: a.conModifier,
            intelligence: a.intelligence,
            intModifier: a.intModifier,
            wisdom: a.wisdom,
            wisModifier: a.wisModifier,
            charisma: a.charisma,
            charModifier: a.charModifier, 
         }
     })
       res.status(200).json({
        Specss: Specss,   
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
    const SpecsID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: SpecsID, userId}
    }
    let itemsRemoved = await Specs.destroy(query)

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
     const SpecsID = req.params.id
     const {
        strength,
            strengthModifier,
            dexterity,
            dexterityModifier,
            constitution,
            conModifier,
            intelligence,
            intModifier,
            wisdom,
            wisModifier,
            charisma,
            charModifier, 
     } = req.body.specs

   const query = {
       where: { 
           id: SpecsID
       }
   }

   const updatedSpecs = {
    strength,
    strengthModifier,
    dexterity,
    dexterityModifier,
    constitution,
    conModifier,
    intelligence,
    intModifier,
    wisdom,
    wisModifier,
    charisma,
    charModifier, 
   }

   const SpecssUpdated = await Specs.update(Specs, query)

   if (SpecssUpdated) res.status(200).json({message: `Specs at id:${SpecsID} is updated`, updatedSpecs})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;