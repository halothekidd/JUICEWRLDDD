let audio = new Audio();
let queue = [];
let currentIndex = -1;
let isPlaying = false;
let currentSong = null;

// ----------------------
// PLAY SONG (MAIN ENTRY)
// ----------------------
function playSong(song, list = null, index = null) {

    currentSong = song;

    // set queue if provided
    if (list) {
        queue = list;
        currentIndex = index ?? list.findIndex(s => s.title === song.title);
    }

    audio.src = song.audioUrl;
    audio.play();

    isPlaying = true;

    updatePlayerUI(song);
    startProgressUpdater();
}

// ----------------------
// TOGGLE PLAY / PAUSE
// ----------------------
function togglePlay() {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }

    updatePlayButton();
}

// ----------------------
// NEXT SONG
// ----------------------
function nextSong() {
    if (!queue.length) return;

    currentIndex++;

    if (currentIndex >= queue.length) {
        currentIndex = 0; // loop
    }

    playSong(queue[currentIndex], queue, currentIndex);
}

// ----------------------
// PREVIOUS SONG
// ----------------------
function prevSong() {
    if (!queue.length) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = queue.length - 1;
    }

    playSong(queue[currentIndex], queue, currentIndex);
}

// ----------------------
// UPDATE UI
// ----------------------
function updatePlayerUI(song) {
    const title = document.getElementById("title");
    const cover = document.getElementById("cover");

    if (title) title.innerText = song.title;
    if (cover && song.cover) {
        cover.style.backgroundImage = `url(${song.cover})`;
        cover.style.backgroundSize = "cover";
    }

    updatePlayButton();
}

// ----------------------
// PLAY BUTTON UI STATE
// ----------------------
function updatePlayButton() {
    const btn = document.querySelector(".player-controls button:nth-child(2)");

    if (!btn) return;

    btn.innerText = isPlaying ? "⏸" : "▶";
}

// ----------------------
// SEEK BAR
// ----------------------
function startProgressUpdater() {
    const seek = document.getElementById("seek");

    if (!seek) return;

    audio.ontimeupdate = () => {
        if (!audio.duration) return;

        seek.value = (audio.currentTime / audio.duration) * 100;
    };

    seek.oninput = () => {
        if (!audio.duration) return;

        audio.currentTime = (seek.value / 100) * audio.duration;
    };
}

// ----------------------
// VOLUME CONTROL
// ----------------------
const volume = document.getElementById("volume");

if (volume) {
    volume.oninput = () => {
        audio.volume = volume.value / 100;
    };
}

// ----------------------
// AUTO NEXT SONG
// ----------------------
audio.addEventListener("ended", () => {
    nextSong();
});

// ----------------------
// OPTIONAL: SHUFFLE (future use)
// ----------------------
function shuffleQueue() {
    queue = queue.sort(() => Math.random() - 0.5);
    currentIndex = 0;
}
