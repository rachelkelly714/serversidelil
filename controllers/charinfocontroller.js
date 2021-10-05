const express = require("express");
const router = express.Router();
const { Charinfo } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 playerName,
                 characterName,
                 alignment,
                 level,
                 deity,
                 race,
                 size,
                 gender,
                 age,
                 height,
                 weight,
                 physicalDescription 
                

            } = req.body.charinfo
         await Charinfo.create({
                 playerName,
                 characterName,
                 alignment,
                 level,
                 deity,
                 race,
                 size,
                 gender,
                 age,
                 height,
                 weight,
                 physicalDescription,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Character Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Charinfos =  await Charinfo.findAll()
     const CharinfosRet = Charinfos.map(a => {
         return {
             id: a.id,
             playerName: a.playerName,
             characterName: a.characterName,
             alignment: a.alignment,
             level: a.level,
             deity: a.deity,
             race: a.race,
             size: a.size,
             gender: a.gender,
             age: a.age,
             height: a.height,
             weight: a.weight,
             physicalDescription: a.physicalDescription
         }
     })
       res.status(200).json({
        Charinfos: Charinfos,   
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
    const CharinfoID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: CharinfoID, userId}
    }
    let itemsRemoved = await Charinfo.destroy(query)

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
     const CharinfoID = req.params.id
     const {
        playerName,
        characterName,
        alignment,
        level,
        deity,
        race,
        size,
        gender,
        age,
        height,
        weight,
        physicalDescription
     } = req.body.charinfo

   const query = {
       where: { 
           id: CharinfoID
       }
   }

   const updatedCharinfo = {
        playerName,
        characterName,
        alignment,
        level,
        deity,
        race,
        size,
        gender,
        age,
        height,
        weight,
        physicalDescription
   }

   const CharinfosUpdated = await Charinfo.update(Charinfo, query)

   if (CharinfosUpdated) res.status(200).json({message: `Charinfo at id:${CharinfoID} is updated`, updatedCharinfo})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;