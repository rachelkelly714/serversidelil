const express = require("express");
const router = express.Router();
const { Money } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 cp,
                 sp,
                 gp,
                 platp,
                

            } = req.body.money
         await Money.create({
            cp,
            sp,
            gp,
            platp,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Coin Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Moneys =  await Money.findAll()
     const MoneysRet = Moneys.map(a => {
         return {
            id: a.id,
            cp: a.cp,
            sp: a.sp,
            gp: a.gp,
            platp: a.platp,
         }
     })
       res.status(200).json({
        Moneys: Moneys,   
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
    const MoneyID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: MoneyID, userId}
    }
    let itemsRemoved = await Money.destroy(query)

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
     const MoneyID = req.params.id
     const {
        cp,
        sp,
        gp,
        platp,
     } = req.body.money

   const query = {
       where: { 
           id:MoneyID
       }
   }

   const updatedMoney = {
    cp,
    sp,
    gp,
    platp,
   }

   const MoneysUpdated = await Money.update(Money, query)

   if (MoneysUpdated) res.status(200).json({message: `Money at id:${MoneyID} is updated`, updatedMoney})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;