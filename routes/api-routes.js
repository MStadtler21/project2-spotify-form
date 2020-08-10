
var { Album, Comment } = require("../models");

module.exports = function (app) {

	app.get("/api/albums", function (req, res) {
		Album.findAll({})
			.then(function (dbAlbums) {
				res.json(dbAlbums);
			});
	});

	app.get("/api/albums/:id", function (req, res) {
		Album.findOne({
			where: {
				title: req.body.title
			}
		}).then(function (dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.get("/api/search/:title", function (req, res) {
		Album.findOne({
			where: {
				id: req.params.title
			}
		}).then(function (dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.post("/api/comment/:id", function (req, res) {
		console.log("req.body is", req.body);
		Comment.create({
			UserId: req.body.UserId,
			text: req.body.text,
			author: req.body.author,
			AlbumSpotifyId: req.body.AlbumSpotifyId
		})
			.then(function () {

				res.end();
			});
	});
};

