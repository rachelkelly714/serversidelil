const router = require("express").Router()
const { Charinfo } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", validateJWT, async (req, res) => {
  try {
    let {
      characterName,
      playerName,
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
    } = req.body.charinfo
    await Charinfo.create({
      characterName,
      playerName,
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
      userId: req.user.id,
    })

    res.status(200).json({
      message: "Character Added",
    
    });
  }catch (error) {
    res.status(500).json({
      message: `Character info not added: ${error}`,
    });
  }
});

router.get('/mine', validateJWT, async (req, res) => {

  try {
    Charinfo.findAll({
      where: {
        userId: req.user.id
      }
    })
    .then((char) => {
      res.status(200).json(char)
    })
  } catch (error) {
    res.status(500).json({
      message: 'failed'
    })
  }
})







router.get("/all", validateJWT, async (req, res) => {
  try {
    const Charinfos = await Charinfo.findAll();
    const CharinfosRet = Charinfos.map((a) => {
      return {
        id: a.id,
        characterName: a.characterName,
        playerName: a.playerName,
        alignment: a.alignment,
        level: a.level,
        deity: a.deity,
        race: a.race,
        size: a.size,
        gender: a.gender,
        age: a.age,
        height: a.height,
        weight: a.weight,
        physicalDescription: a.physicalDescription,
      };
    });
    res.status(200).json({
      Charinfos: Charinfos,
      message: "Success!",
    });
  } catch (error) {
    res.status(500).json({
      message: `Data not found ${error}`,
    });
  }
});

router.delete("/:id", validateJWT, async (req, res) => {
    const CharinfoID = req.params.id;
    const userId = req.user.id;
    console.log(CharinfoID, userId)
  try {
    const query = {
      where: { id: CharinfoID, userId },
    };
    let itemsRemoved = await Charinfo.destroy(query)

    if (itemsRemoved) {
      res.status(200).json({
        message: "Info Removed",
      })
    } else {
      res.status(404).json({
        message: "Info not found",
      });
      console.log(error)
    }
  } catch (error) {
    res.status(500).json({
      message: `Error: {$error}`,
    });
  }
});

router.put("/update/:id", validateJWT, async (req, res) => {
  try {
    let CharinfoID = req.params.id;
    let {
      characterName,
      playerName,
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
    } = req.body.charinfo;

    let query = {
      where: {
        id: CharinfoID,
      },
    };

    let updatedCharinfo = {
      characterName,
      playerName,
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
    } = req.body.charinfo

    let CharinfosUpdated = await Charinfo.update(updatedCharinfo, query);

    if (CharinfosUpdated)
      res
        .status(200)
        .json({
          message: `Charinfo at id:${CharinfoID} is updated`, CharinfosUpdated});
  } catch (error) {
    res.status(500).json({
      message: `Error: ${error}`,
    });
  }
});

module.exports = router;
