const express = require("express");
const router = express.Router();
const { Xp } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 xpLevel, 
                
            } = req.body.xp
         await Xp.create({
                 xpLevel,
                userId: req.user.id
         })

         res.status(200).json({
             message: "Xp Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Xps =  await Xp.findAll()
     const XpsRet = Xps.map(a => {
         return {
             id: a.id,
             xpLevel: a.xpLevel,
         }
     })
       res.status(200).json({
        Xps: Xps,   
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
    const XpID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: XpID, userId}
    }
    let itemsRemoved = await Xp.destroy(query)

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
     const XpID = req.params.id
     const {
        xpLevel
     } = req.body.xp

   const query = {
       where: { 
           id: XpID
       }
   }

   const updatedXp = {
    xpLevel
   }

   const XpsUpdated = await Xp.update(Xp, query)

   if (XpsUpdated) res.status(200).json({message: `Xp at id:${XpID} is updated`, updatedXp})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;