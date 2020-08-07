var db = require("../models");
var request = require("request"); // "Request" library
var querystring = require("querystring");

module.exports = function (app) {
  var client_id = "3b0d3695fb3e46f199fd7ee4d52c6f1a"; // Your client id
  var client_secret = "b27677b64963453c9bc757b665aac458"; // Your secret
  var redirect_uri = "http://localhost:8888/auth"; // Your initial redirect uri

  var stateKey = "spotify_auth_state";
  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  var generateRandomString = function (length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  app.get("/add/:id/:token", (req, res) => {
    let id = req.params.id;
    let token = req.params.token;
    console.log("add", id, token);

    // ! if token == null, undefined, or zero: redirect to login?

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var options = {
      url: `https://api.spotify.com/v1/albums/${id}`,
      headers: { Authorization: "Bearer " + token },
      json: true,
    };

    // use the access token to access the Spotify Web API
    request.get(options, function (error, response, body) {
      if(error) {
        throw error;
      }
      console.log(body);
      console.log(response);
      // res.json(body)
      // ! create entry
    });
  });

  app.get("/login", function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = "";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });

  // ! upon authentication
  app.get("/auth", function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log(state);
    if (state === null || state !== storedState) {
      res.redirect(
        "/index" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;
          console.log(access_token);
          // let id = "0sNOF9WDwhWunNAHPD3Baj";
          // var options = {
          //   url: `https://api.spotify.com/v1/albums/${id}`,
          //   headers: { Authorization: "Bearer " + access_token },
          //   json: true,
          // };

          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            console.log(body);
            // res.json(body)
            // ! check for db entry

            // ! if no entry, create
          });
          console.log("auth: OK, redirect to index");
          // we can also pass the token to the browser to make requests from there
          res.redirect(
            // "/#"
            "/#" +
              querystring.stringify({
                access_token: access_token,
              })
          );
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        // console.log(access_token)
        // console.log(authOptions)
        res.send({
          access_token: access_token,
        });
      }
    });
  });
};
