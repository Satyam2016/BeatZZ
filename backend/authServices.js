// authService.js
import express from 'express';
import axios from 'axios';
import session from 'express-session';

const router = express.Router();

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:3001/callback'; // Your callback URL
const stateKey = 'spotify_auth_state';

router.use(session({
  secret: 'your_secret_key', // Change this to a secret key for session encryption
  resave: false,
  saveUninitialized: true,
}));

router.get('/login', (req, res) => {
  const state = Math.random().toString(36).substring(2, 15);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';
  res.redirect(`https://accounts.spotify.com/authorize?${
    new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    }).toString()
  }`);
});

router.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' + new URLSearchParams({
      error: 'state_mismatch'
    }).toString());
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    try {
      const response = await axios.post(authOptions.url, authOptions.form);
      if (response.status === 200) {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;

        // Store access token and refresh token in session
        req.session.access_token = access_token;
        req.session.refresh_token = refresh_token;

        // Redirect user to home page or wherever you want
        res.redirect('/');
      } else {
        res.redirect('/#' + new URLSearchParams({
          error: 'invalid_token'
        }).toString());
      }
    } catch (error) {
      console.error('Error exchanging code for access token:', error.response.data);
      res.redirect('/#' + new URLSearchParams({
        error: 'server_error'
      }).toString());
    }
  }
});

module.exports = router;
