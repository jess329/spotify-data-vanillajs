



// Necessary information stored in variables
const apiUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';
const CLIENT_ID = "78e5f6cd10474053b7c867134e3f5205"
const CLIENT_SECRET = "175b33f71a7e43d1b7a09156b2d26259"
const response_type = "code"
const REDIRECT_URI = "http://localhost:3500/callback"
const scope = 'user-top-read'
let access_token = ""
let refresh_token = ""
const playlistId = "37i9dQZF1DX0XUsuxWHRQd"

// Requesting general spotify data

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
        const img = song?.track?.album?.images[2]?.url
        const track = song.track.name
        const artists =  song.track.artists[0].name
        const link = song.track.external_urls.spotify

        const songDiv = document.createElement("div")
        songDiv.classList.add("songDiv")
        const songInfoDiv = document.createElement("div")
        songInfoDiv.classList.add("song-info")
        const linkTag = `<a href=${link} target=_blank >Play on Spotify<a/>` 

        const songNameTag = document.createElement("h3")
        const song_name = document.createTextNode(`Track: ${track}`)
        const artistTag = document.createElement("h3")
        const artist = document.createTextNode(`Artist: ${artists}`)
        const linkDiv = document.createElement("div")
        

        songsDiv.appendChild(songDiv)
        songDiv.appendChild(songInfoDiv)
        songInfoDiv.appendChild(songNameTag)
        songInfoDiv.appendChild(artistTag)
        songInfoDiv.appendChild(linkDiv)
        songNameTag.appendChild(song_name)
        artistTag.appendChild(artist)

        const imgholderDiv = document.createElement("div")
        imgholderDiv.classList.add("imgholder")
        imgholderDiv.innerHTML = `<img src=${img} classname="song-img" />`
        songDiv.appendChild(imgholderDiv)

        linkDiv.innerHTML = linkTag
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

// Requesting speficic data about a spotify user


const buttons = document.querySelectorAll(".btn")
const generalData = document.getElementsByClassName("playlist")[0]
const userContent = document.getElementsByClassName("user")[0]
buttons.forEach((button, index) => {
    button.onclick = () => {
        if(index == 0) {
            buttons[0].classList.add("active")
            buttons[1].classList.remove("active")
            generalData.style.display = "grid"
            userContent.style.display = "none"
        } else {
            buttons[0].classList.remove("active")
            buttons[1].classList.add("active")
            generalData.style.display = "none"
            userContent.style.display = "grid"
        }
    }    
})


// const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&response_type=code`;

const authBtn = document.getElementsByClassName("btn authorize")[0]
authBtn.onclick = () => {
    window.location.href = '/login'
}



