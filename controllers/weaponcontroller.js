const express = require("express");
const router = express.Router();
const { Weapon } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async(req, res) => {
    try{
             let {
                 weaponOne,
                 attackBonus,
                 criticalRange,
                 weaponType,
                 range,
                 ammunition,
                 damage,
                

            } = req.body.weapon
         await Weapon.create({
            weaponOne,
            attackBonus,
            criticalRange,
            weaponType,
            range,
            ammunition,
            damage,
            userId: req.user.id
         })

         res.status(200).json({
             message: "Weapon Added"
         })

        } catch(error){
            res.status(500).json({
                message: `Info not added: ${error}`
            })
        }
        
        })


router.get("/all",validateJWT, async (req, res) => {
   try{
     const Weapons =  await Weapon.findAll()
     const WeaponsRet = Weapons.map(a => {
         return {
             id: a.id,
             weaponOne: a.weaponOne,
             attackBonus: a.attackBonus,
             criticalRange: a.criticalRange,
            weaponType: a.weaponType,
            range: a.range,
            ammunition: a.ammunition,
            damage: a.damage,
         }
     })
       res.status(200).json({
        Weapons: Weapons,   
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
    const WeaponID = req.params.id
    const userId = req.user.id
    const query = {
        where: {id: WeaponID, userId}
    }
    let itemsRemoved = await Weapon.destroy(query)

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
     const WeaponID = req.params.id
     const {
        weaponOne,
        attackBonus,
        criticalRange,
        weaponType,
        range,
        ammunition,
        damage,
     } = req.body.weapon

   const query = {
       where: { 
           id: WeaponID
       }
   }

   const updatedWeapon = {
    weaponOne,
    attackBonus,
    criticalRange,
    weaponType,
    range,
    ammunition,
    damage,
   }

   const WeaponsUpdated = await Weapon.update(Weapon, query)

   if (WeaponsUpdated) res.status(200).json({message: `Weapon at id:${WeaponID} is updated`, updatedWeapon})

   } catch (error) {
       res.status(500).json({
           message: `Error: ${error}`
       })
   }


})


module.exports = router;