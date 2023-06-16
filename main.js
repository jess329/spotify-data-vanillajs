
const apiUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';
const CLIENT_ID = "78e5f6cd10474053b7c867134e3f5205"
const CLIENT_SECRET = "175b33f71a7e43d1b7a09156b2d26259"
const response_type = "code"
const REDIRECT_URI = "https://spotify-stats-jess.netlify.app/"
let access_token = ""
let refresh_token = ""
const playlistId = "37i9dQZF1DX0XUsuxWHRQd"


const fetchSpotifyCharts = async (token) => {
    const resp = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
    const data = await resp.json()
    console.log(data);
}
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
const createPlaylistHMTL = (playlist) => {
    const playlistDiv = document.getElementsByClassName('playlist')[0];
    const songs = playlist.tracks.items
    console.log(songs);
    songs.map((song) => {
        const songDiv = document.createElement("div")
        const song_name = document.createTextNode(`Track: ${song.track.name}`)
        songDiv.appendChild(song_name)
        playlistDiv.appendChild(songDiv)
    })
}

const callDataFetching = (token) => {
    fetchSpotifyCharts(token)
    fetchPlaylist(token)
}

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

const assignAccessToken = (token) => {
    access_token = token;
    console.log(access_token);
    callDataFetching(access_token)
    return access_token
};
access_token = getToken(assignAccessToken).then()
console.log(access_token);


fetchSpotifyCharts(access_token)

// const getAccessToken = async () => {
//     access_token = await getToken()
// }

