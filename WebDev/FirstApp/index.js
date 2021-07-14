const express = require("express");
const app = express();

app.use((req, res) => {
    console.log("WE GOT A NEW REQUEST!!")
    // res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!")
    res.send({color: 'red'})
})



app.listen(8080, () => {
    console.log(`LISTENING ON PORT 8080!`)
  })