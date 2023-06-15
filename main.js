console.log(document, window, navigator);

const apiUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists';
const CLIENT_ID = "78e5f6cd10474053b7c867134e3f5205"
const CLIENT_SECRET = "175b33f71a7e43d1b7a09156b2d26259"
const REDIRECT_URI = "file:///C:/Users/jaspe/Desktop/Coding/.vscode/JS%20Projects/Spotify%20API%20(vanillajs)/index.html#"
let access_token = ""
let refresh_token = ""

curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"


// const accessToken = 'your-access-token'; // Replace with your valid access token

// fetch(apiUrl, {
//   headers: {
//     'Authorization': `Bearer ${accessToken}`,
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the API response data
//     console.log(data);
//     // Extract the relevant information and update your HTML accordingly
//   })
//   .catch(error => {
//     // Handle error
//     console.error('Error:', error);
//   });

const fetchSpotifyCharts = async () => {
    const resp = await fetch(apiUrl)
    const data = await resp.json()
    console.log(data);
}
window.onload = () => {
    try {
        fetchSpotifyCharts()
    } catch (error) {
        console.log(error);
    }
}