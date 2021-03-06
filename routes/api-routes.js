var { Album, Comment } = require("../models");

module.exports = function (app) {
	app.get("/api/albums/all", function (req, res) {
		var query = {};
		Album.findAll({
			where: query,
			raw: true,
		}).then(function (dbAlbum) {
			console.log(dbAlbum);
			res.json(dbAlbum);
		});
	});

	app.get("/api/albums/:id", function (req, res) {
		console.log(req.body);
		// Album.findOne({
		//   where: {
		//     title: req.body.id,
		//   },
		// }).then(function (dbAlbum) {
		//   res.json(dbAlbum);
		// });
	});

	app.get("/api/albums/:title", function (req, res) {
		Album.findOne({
			where: {
				id: req.params.title,
			},
		}).then(function (dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.get("/api/comment/:id", function (req, res) {
		console.log("req params", req.params.id);
		Comment.findAll({
			where: {
				AlbumSpotifyId: req.params.id
			}
		}).then(function (dbComment) {
			res.json(dbComment);
		});
	});

	app.post("/api/comment/:id", function (req, res) {
		console.log("req.body is", req.body);
		Comment.create({
			displayName: req.body.author,
			text: req.body.text,
			AlbumSpotifyId: req.body.AlbumSpotifyId,
		}).then(function () {
			res.end();
		});
	});
};
