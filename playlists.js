let playlists = {};
let currentPlaylist = null;

/* CREATE PLAYLIST */
function createPlaylist(name){
    if(!playlists[name]){
        playlists[name] = [];
    }
    currentPlaylist = name;
}

/* ADD SONG TO PLAYLIST */
function addToPlaylist(song){
    if(!currentPlaylist) return;

    playlists[currentPlaylist].push(song);
}

/* REMOVE SONG */
function removeFromPlaylist(name, index){
    playlists[name].splice(index, 1);
}

/* GET PLAYLIST */
function getPlaylist(name){
    return playlists[name] || [];
}

/* PLAY ENTIRE PLAYLIST */
function playPlaylist(name){
    if(!playlists[name] || playlists[name].length === 0) return;

    playSong(playlists[name][0], playlists[name], 0);
}
