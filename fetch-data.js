const API_BASE = "https://juicewrld.api";

// GLOBAL STATE (your app data lives here)
let allSongs = [];
let filteredSongs = [];

// -------------------------
// LOAD SONGS FROM API
// -------------------------
async function loadSongs() {
    try {
        const res = await fetch(`${API_BASE}/songs`);
        const data = await res.json();

        allSongs = data;
        filteredSongs = data;

        renderSongs(filteredSongs);
        updateStats(filteredSongs);

    } catch (err) {
        console.error("Error loading songs:", err);
    }
}

// -------------------------
// RENDER SONGS TO UI
// (you must have #songList in HTML)
// -------------------------
function renderSongs(songs) {
    const container = document.getElementById("songList");
    container.innerHTML = "";

    songs.forEach(song => {
        const div = document.createElement("div");
        div.className = "song";

        div.innerHTML = `
            <img src="${song.cover}" width="50" height="50" style="border-radius:6px;">
            <div style="flex:1; margin-left:10px;">
                <b>${song.title}</b><br>
                <small>${song.era} • ${song.status}</small>
            </div>
            <button onclick='playSong(${JSON.stringify(song)})'>Play</button>
        `;

        container.appendChild(div);
    });
}

// -------------------------
// SEARCH SONGS
// -------------------------
function searchSongs(query) {
    const q = query.toLowerCase();

    filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(q)
    );

    renderSongs(filteredSongs);
}

// -------------------------
// FILTER BY ERA + CATEGORY
// -------------------------
function filterSongs(era, category) {
    filteredSongs = allSongs.filter(song => {
        let eraMatch = era ? song.era === era : true;
        let catMatch = category ? song.status === category : true;

        return eraMatch && catMatch;
    });

    renderSongs(filteredSongs);
}

// -------------------------
// SORT SYSTEM
// -------------------------
function sortSongs(type) {

    let sorted = [...filteredSongs];

    if (type === "default") {
        sorted = allSongs;
    }

    if (type === "length") {
        sorted.sort((a, b) => a.length - b.length);
    }

    if (type === "dateRecorded") {
        sorted.sort((a, b) =>
            new Date(a.recorded) - new Date(b.recorded)
        );
    }

    if (type === "dateSurfaced") {
        sorted.sort((a, b) =>
            new Date(a.surfaced || 0) - new Date(b.surfaced || 0)
        );
    }

    filteredSongs = sorted;
    renderSongs(filteredSongs);
}

// -------------------------
// STATS (counts at top)
// -------------------------
function updateStats(songs) {
    const released = songs.filter(s => s.status === "released").length;
    const unreleased = songs.filter(s => s.status === "unreleased").length;
    const unsurfaced = songs.filter(s => s.status === "unsurfaced").length;
    const studio = songs.filter(s => s.status === "studio_sessions").length;

    document.getElementById("stats").innerHTML = `
        Studio Sessions: ${studio} |
        Released: ${released} |
        Unreleased: ${unreleased} |
        Unsurfaced: ${unsurfaced}
    `;
}

// -------------------------
// REFRESH API BUTTON
// -------------------------
function refreshAPI() {
    loadSongs();
}

// -------------------------
// INITIAL LOAD
// -------------------------
loadSongs();
