// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "../views/index.handlebars"));
	});

	// album page
	app.get("/album", function (req, res) {
		res.sendFile(path.join(__dirname, "../views/album.handlebars"));
	});

	// route testing
	app.get("/route-test", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/html/route-test.html"));
	});
};
