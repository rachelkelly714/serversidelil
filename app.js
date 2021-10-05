const express = require("express");
const app = express();
const db = require("./db");

app.use(require("./middleware/headers"));
const controllers = require("./controllers");
app.use(express.json());

const { User } = require("./models/user");

/*Controllers*/
app.use("/user", controllers.usercontroller);
app.use("/skills", controllers.skillscontroller);
app.use("/equipment", controllers.equipmentcontroller);
app.use("/charinfo", controllers.charinfocontroller);
app.use("/ahiss", controllers.ahisscontroller); 
app.use("/gear", controllers.gearcontroller);
app.use("/money", controllers.moneycontroller);
app.use("/spellsperday", controllers.spdcontroller);
  //might be /spd
app.use("/specs", controllers.specscontroller);
app.use("/spells", controllers.spellscontroller);
app.use("/weapon", controllers.weaponcontroller);
app.use("/xp", controllers.xpcontroller)



/*Port/DbSync*/

db.authenticate()
  .then(() => db.sync({force: true})) // => {force: true}
  .then(() => {
    app.listen(3000, () =>
      console.log(`[Server: ] App is listening on Port ${3000}`)
    );
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  });
