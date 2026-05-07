const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =================================================
   TEMP SONG DATABASE (replace later with API/MongoDB)
================================================= */
let songs = [
    {
        id: 1,
        title: "Example Song",
        era: "Death Race For Love",
        status: "unreleased",
        type: "studio_sessions",
        producer: "Nick Mira",
        recorded: "2018-06-10",
        length: 180,
        audioUrl: "/audio/example.mp3",
        cover: "/covers/example.jpg"
    }
];

/* =================================================
   GET SONGS (SEARCH + FILTER + SORT)
================================================= */
app.get("/api/songs", (req, res) => {
    let result = songs;

    // SEARCH
    if (req.query.search) {
        const q = req.query.search.toLowerCase();
        result = result.filter(song =>
            song.title.toLowerCase().includes(q)
        );
    }

    // FILTER BY ERA
    if (req.query.era) {
        result = result.filter(song => song.era === req.query.era);
    }

    // FILTER BY STATUS
    if (req.query.status) {
        result = result.filter(song => song.status === req.query.status);
    }

    // SORT OPTIONS
    if (req.query.sort === "length") {
        result = result.sort((a, b) => a.length - b.length);
    }

    if (req.query.sort === "dateRecorded") {
        result = result.sort(
            (a, b) => new Date(a.recorded) - new Date(b.recorded)
        );
    }

    res.json(result);
});

/* =================================================
   ADD SONG (OPTIONAL - FOR ADMIN / FUTURE USE)
================================================= */
app.post("/api/songs", (req, res) => {
    const newSong = {
        id: songs.length + 1,
        ...req.body
    };

    songs.push(newSong);

    res.json({
        success: true,
        song: newSong
    });
});

/* =================================================
   BASIC SERVER CHECK
================================================= */
app.get("/", (req, res) => {
    res.send("Juice WRLD API is running");
});

/* =================================================
   START SERVER
================================================= */
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
