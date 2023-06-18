const express = require('express');
const app = express();
const port = 3500; // Change the port number if needed
const CLIENT_ID = "78e5f6cd10474053b7c867134e3f5205"
const CLIENT_SECRET = "175b33f71a7e43d1b7a09156b2d26259"
const RED_URI = "https%3A%2F%2Fspotify-stats-jess.netlify.app%2Fcallback"

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const SpotifyWebApi = require("spotify-web-api-node")
const spotifyAuthApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: RED_URI,
})

app.get("/login", (req, res) => {
  const generateRandomString = (length) => {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
  
  const stateString = generateRandomString(16);
  res.cookie("authState", stateString);
  const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(RED_URI)}&scope=${encodeURIComponent(scope)}&response_type=code`;

  
  const loginLink = spotifyAuthApi.createAuthorizeURL(scope, stateString);
  console.log(loginLink);
  res.redirect(authorizationUrl);
})

app.get('/callback', (req, res) => {
  const { code, state } = req.query;

  // Check if the state matches the one stored in the cookie
  const storedState = req.cookies.authState;
  if (state !== storedState) {
    // Handle state mismatch error
    res.status(401).send('State mismatch error');
    return;
  }

  // Clear the authState cookie
  res.clearCookie('authState');

  // Use the authorization code to request an access token
  spotifyAuthApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body.access_token;
      const refreshToken = data.body.refresh_token;

      // Use the access token and refresh token as needed
      // Perform further actions with the Spotify API

      // Send a response or redirect to a success page
      res.redirect('/success');
    })
    .catch((error) => {
      // Handle authorization code grant error
      console.error('Authorization code grant error:', error);
      res.status(500).send('Authorization code grant error');
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});