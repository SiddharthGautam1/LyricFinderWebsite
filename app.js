const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine" , "ejs");

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res) => {
    const artist = req.body.artist
    const song = req.body.song
    const url = "https://api.lyrics.ovh/v1/" + artist + "/" + song

    https.get(url, (response) => {
        response.on("data" ,(data) => {
            const lyrics = JSON.parse(data);
            res.render("result" , { 
                artist: artist,
                song : song,
                lyrics: lyrics.lyrics
            })
        })
    })
})



app.listen(3000,() => {
    console.log("Server has been started at port 3000")
})