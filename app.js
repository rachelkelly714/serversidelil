const express = require("express");

const app = express();
const db = require("./db");
// const cors = require('cors')
// app.use(cors())

app.use(express.json());

app.use(require("./middleware/headers"));
const controllers = require("./controllers");


app.use("/user", controllers.usercontroller);


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
