const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/test', (req, res) => {
    res.send("Are you working?")
})


router.post('/register', (req, res) => {

    const userObj = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,12)
    } 

    User.create(userObj)
    .then((created) => { 
        const token = jwt.sign({id:created.id},'secret',{expiresIn:'30d'})
        res.status(200).json({
            User: created,
            Message: 'Player Created!',
            SessionToken: token
        })
    })

.catch(err => {
    res.status(500).json(err)
})

})

router.post('/login', async (req, res) => {
    try{
const found = await User.findOne({where: {
    username: req.body.username
}})
   if(!found){
       res.status(404).json("User not found.")
   } else {
     let passwordCompare = await bcrypt.compare(req.body.password, found.password)  
if (passwordCompare){
      let token = jwt.sign({id: found.id}, 'secret', {expiresIn: '1d'}) 

      res.status(200).json({
          User: found, 
          Message: 'Player logged in',
          SessionToken: token
        
        
        })
    
    
    }else {
        res.status(401).json({
            Message: 'You Shall Not Pass! *lightning strikes*'
        })
    }
}


    }catch(err){
       res.status(500).json(err)
    }
})
 


module.exports = router;