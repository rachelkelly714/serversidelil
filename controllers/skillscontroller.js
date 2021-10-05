const express = require("express");
const router = express.Router();
const {Skills } = require("../models");
const validateJWT = require("../middleware/validate-jwt");



router.post("/create", validateJWT, async(req, res) => {
    try{
             let {acrobatics, 
                appraise, 
                bluff,
                climb, 
                craft, 
                craftTwo,
                diplomacy, 
                disableDevice, 
                disguise,
                escapeArtist, 
                fly, 
                handleAnimal,
                heal, 
                intimidate, 
                knowledgeArcana,
                knowledgeHistory, 
                knowledgeLocal, 
                knowledgeReligion,
                knowledgeOther, 
                linguistics, 
                perception,
                perform, 
                profession, 
                ride,
                senseMotive, 
                sleightOfHand, 
                stealth,
                spellcraft, 
                survival, 
                swim,
                useMagicDevice, 
                languages, 
                

            } = req.body.skill
         await Skills.create({
            acrobatics,
            appraise, 
            bluff,
            climb, 
            craft, 
            craftTwo,
            diplomacy, 
            disableDevice, 
            disguise,
            escapeArtist, 
            fly, 
            handleAnimal,
            heal, 
            intimidate, 
            knowledgeArcana,
            knowledgeHistory, 
            knowledgeLocal, 
            knowledgeReligion,
            knowledgeOther, 
            linguistics, 
            perception,
            perform, 
            profession, 
            ride,
            senseMotive, 
            sleightOfHand, 
            stealth,
            spellcraft, 
            survival, 
            swim,
            useMagicDevice, 
            languages, 
            userId: req.user.id
         })

         res.status(200).json({
             message: "Skill Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Skill not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Skill =  await Skills.findAll()
     const SKillRet = Skills.map(a => {
         return {
             id: a.id,
            acrobatics: a.acrobotics,
            appraise: a.appraise, 
            bluff: a.bluff,
            climb: a.climb, 
            craft: a.craft, 
            craftTwo: a.craftTwo,
            diplomacy: a.diplomacy, 
            disableDevice: a.disableDevice, 
            disguise: a.disguise,
            escapeArtist: a.escapeArtist, 
            fly: a.fly, 
            handleAnimal: a.handleAnimal,
            heal: a.heal, 
            intimidate: a.intimidate, 
            knowledgeArcana: a.knowledgeArcana,
            knowledgeHistory: a.knowledgeHistory, 
            knowledgeLocal: a.knowledgeLocal, 
            knowledgeReligion: a.knowledgeReligion,
            knowledgeOther: a.knowledgeOther, 
            linguistics: a.linguistics, 
            perception: a.perception,
            perform: a.perform, 
            profession: a.profession, 
            ride: a.ride,
            senseMotive: a.senseMotive, 
            sleightOfHand: a.sleightOfHand, 
            stealth: a.stealth,
            spellcraft: a.spellcraft, 
            survival: a.survival, 
            swim: a.swim,
            useMagicDevice: a.useMagicDevice, 
            languages: a.languages
         }
     })
       res.status(200).json({
        Skills: Skills,   
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
    const SkillID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: SkillID, userId}
    }
    let itemsRemoved = await Skill.destroy(query)

    if (itemsRemoved){
        res.status(200).json({
            message: 'Skill Removed'
        })
    } else {
        res.status(404).json({
            message: "Skill not found"
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
     const SkillID = req.params.id
     const {
        acrobatics,
        appraise, 
        bluff,
        climb, 
        craft, 
        craftTwo,
        diplomacy, 
        disableDevice, 
        disguise,
        escapeArtist, 
        fly, 
        handleAnimal,
        heal, 
        intimidate, 
        knowledgeArcana,
        knowledgeHistory, 
        knowledgeLocal, 
        knowledgeReligion,
        knowledgeOther, 
        linguistics, 
        perception,
        perform, 
        profession, 
        ride,
        senseMotive, 
        sleightOfHand, 
        stealth,
        spellcraft, 
        survival, 
        swim,
        useMagicDevice, 
        languages, 
     } = req.body.skill

   const query = {
       where: { 
           id: SkillID
       }
   }

   const updatedSkill = {
    acrobatics,
    appraise, 
    bluff,
    climb, 
    craft, 
    craftTwo,
    diplomacy, 
    disableDevice, 
    disguise,
    escapeArtist, 
    fly, 
    handleAnimal,
    heal, 
    intimidate, 
    knowledgeArcana,
    knowledgeHistory, 
    knowledgeLocal, 
    knowledgeReligion,
    knowledgeOther, 
    linguistics, 
    perception,
    perform, 
    profession, 
    ride,
    senseMotive, 
    sleightOfHand, 
    stealth,
    spellcraft, 
    survival, 
    swim,
    useMagicDevice, 
    languages 
   }

   const SkillsUpdated = await Skill.update(updatedSkill, query)

   if (SkillsUpdated) res.status(200).json({message: `Skillat id:${SkillID} is updated`, updatedSkill})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;