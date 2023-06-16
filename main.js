// Necessary information stored in variables
const apiUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';
const CLIENT_ID = "78e5f6cd10474053b7c867134e3f5205"
const CLIENT_SECRET = "175b33f71a7e43d1b7a09156b2d26259"
const response_type = "code"
const REDIRECT_URI = "https://spotify-stats-jess.netlify.app/"
let access_token = ""
let refresh_token = ""
const playlistId = "37i9dQZF1DX0XUsuxWHRQd"

// fetches some playlists from spotify
const fetchSpotifyPlaylists = async (token) => {
    const resp = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
    const data = await resp.json()
    console.log(data);
}

// fetches data about a single playlist and calls the CreatePlaylistHTML() function with the data passed in
const fetchPlaylist = async (token) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`
    const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    const data = await resp.json()
    console.log(data);
    createPlaylistHMTL(data)
}

// creates the HTML structure for the playlist dynamically  
const createPlaylistHMTL = (playlist) => {
    const songsDiv = document.getElementsByClassName("songs")[0]
    const playlistHeader = document.getElementsByClassName("playlist-header")[0]
    playlistHeader.innerText = `Playlist: ${playlist.name}`

    // gets array of playlist songs and stores it in variable songs
    const songs = playlist.tracks.items
    console.log(songs)

    // maps over songs array and creates HTML for every song
    songs.map((song) => {
        const songDiv = document.createElement("div")
        songDiv.classList.add("songDiv")

        const songNameTag = document.createElement("h3")
        const song_name = document.createTextNode(`Track: ${song.track.name}`)

        songDiv.appendChild(songNameTag)
        songNameTag.appendChild(song_name)
        songsDiv.appendChild(songDiv)
    
        const imgholderDiv = document.createElement("div")
        imgholderDiv.classList.add("imgholder")
        // const songImgTag = `<img src=${song?.track?.album?.images?.images[0]?.url} classname="song-img" />`
        // songDiv.appendChild(imgholderDiv)
    })
        
}

// spreads the access token to the functions that fetch the actual spotify data
const callDataFetching = (token) => {
    fetchSpotifyPlaylists(token)
    fetchPlaylist(token)
}

// fetches an access token from the spotify api when the site is loaded (valid for 1 hr)
// returns the value that is returned by the callback function with the token passed in 
const getToken = async (callback) => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        },
        body: "grant_type=client_credentials"
    })
    const data = await result.json()
    console.log(data);
    const token = data.access_token

    return callback(token)
} 

// Callback function, that also calls the CallDataFetching() function
const assignAccessToken = (token) => {
    access_token = token;
    console.log(access_token);
    callDataFetching(access_token)
    return access_token
};
access_token = getToken(assignAccessToken).then()
console.log(access_token);


// fetchSpotifyCharts(access_token)


