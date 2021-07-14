const express = require("express");
const app = express();
const path = require('path');

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!")
//     // res.send("HELLO, WE GOT YOUR REQUEST! THIS IS A RESPONSE!")
//     // res.send({color: 'red'})
// })

app.use(express.static(path.join(__dirname, '/views')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit })
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${posId} on ${subreddit} subreddit`)
})


app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random.ejs', { num })
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!!!`)
})

app.listen(8080, () => {
    console.log(`LISTENING ON PORT 8080!`)
  })