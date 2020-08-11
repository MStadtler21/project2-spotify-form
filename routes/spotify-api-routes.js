/* eslint-disable no-mixed-spaces-and-tabs */
var db = require("../models");
var request = require("request"); // "Request" library
var querystring = require("querystring");

module.exports = function (app) {
	var client_id = "3b0d3695fb3e46f199fd7ee4d52c6f1a"; // Your client id
	var client_secret = "b27677b64963453c9bc757b665aac458"; // Your secret
	//var redirect_uri = "https://project-2-chatify.herokuapp.com/auth-user"; // production
	var redirect_uri = "http://localhost:8888/auth-user"; // development

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

	// spotify:album:3PhPBXHydvZGpmUpFec4Ps
	app.get("/add/:id/:token", (req, res) => {
		let id = req.params.id;
		let token = req.params.token;
		console.log(token);

		// album request
		var options = {
			url: `https://api.spotify.com/v1/albums/${id}`,
			headers: { Authorization: "Bearer " + token },
			json: true,
		};

		// use the access token to receive album data
		request.get(options, function (error, response, body) {
			// ! check for album first, then add
			function isIdUnique(id) {
				return db.Album.count({ where: { spotify_id: id } }).then((count) => {
					if (count != 0) {
						return false;
					} else {
						db.Album.create({
							spotify_id: id,
							title: body.name,
							artist: body.artists[0].name,
							imgURLMed: body.images[1].url,
							imgURLLarge: body.images[0].url,
						}).then(function (results) {
							// ! redirect to album page
							res.redirect(
								"/#" +
								querystring.stringify({
									access_token: token,
								})
							);
						});
					}
				});
			}
			isIdUnique(body.id);
		});
	});

	app.get("/login", function (req, res) {
		var state = generateRandomString(16);
		res.cookie(stateKey, state);
		// console.log(res.cookie(stateKey, state))

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
	app.get("/auth-user", function (req, res) {
		// your application requests refresh and access tokens
		// after checking the state parameter

		var code = req.query.code || null;
		var state = req.query.state || null;
		var storedState = req.cookies ? req.cookies[stateKey] : null;

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

					// profile info request
					var options = {
						url: "https://api.spotify.com/v1/me",
						headers: { Authorization: "Bearer " + access_token },
						json: true,
					};

					// use the access token to access the Spotify Web API
					request.get(options, function (error, response, body) {
						console.log(body);

						function isIdUnique(id) {
							return db.User.count({ where: { spotifyUserId: id } }).then(
								(count) => {
									if (count != 0) {
										return false;
									} else {
										db.User.create({
											displayName: body.display_name,
											imgURL: body.images[0].url,
											spotifyUserId: body.id,
										}).then(function (results) {
											// res.end();
										});
									}
								}
							);
						}
						isIdUnique(body.id);
						// var isIdUnique = (id) =>
						//   db.User.findOne({ where: { spotifyUserId: id } })
						//     .then((token) => token !== null)
						//     .then((isUnique) => isUnique);
					});

					// we can also pass the token to the browser to make requests from there
					res.redirect(
						"/#" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
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
