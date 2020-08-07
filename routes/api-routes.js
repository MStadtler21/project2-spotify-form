//Get all
///api/search/:title
//api/album:id
//POst /api/comment/:id

var db = require("../models");

module.exports = function (app) {

	app.get("/api/albums", function (req, res) {
		db.Album.findAll({})
			.then(function (dbAlbums) {
				res.json(dbAlbums);
			});
	});

	app.get("/api/album:id", function (req, res) {
		db.Album.findOne({
			where: {
				title: req.body.title
			}
		}).then(function (dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.get("/api/search/:title", function (req, res) {
		db.Album.findOne({
			where: {
				id: req.params.title
			}
		}).then(function (dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.post("/api/comment/:id", function (req, res) {
		console.log("req.body is", req.body);
		db.Comment.create({
			text: req.body.text,
			author: req.body.author
		})
			.then(function (dbComment) {
				console.log(dbComment);
				res.end();
			});
	});
};
