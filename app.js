require('dotenv').config()
const express = require("express");

const app = express();
const db = require("./db");
const cors = require('cors')
app.use(cors())

app.use(express.json());

app.use(require("./middleware/headers"));
const controllers = require("./controllers");


app.use("/user", controllers.usercontroller);
app.use("/skills", controllers.skillscontroller);
app.use("/equipment", controllers.equipmentcontroller);
app.use("/charinfo", controllers.charinfocontroller);
app.use("/ahiss", controllers.ahisscontroller); 
app.use("/gear", controllers.gearcontroller);
app.use("/money", controllers.moneycontroller);
app.use("/spellsperday", controllers.spdcontroller);
app.use("/specs", controllers.specscontroller);
app.use("/spells", controllers.spellscontroller);
app.use("/weapon", controllers.weaponcontroller);
app.use("/xp", controllers.xpcontroller)


db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(5500, () =>
      console.log(`[Server: ] App is listening on Port ${5500}`)
    );
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  });
