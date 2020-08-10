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
		res.render("index");
	});



	// album page
<<<<<<< HEAD
	app.get("/album", function (req, res) {
=======
	app.get("/albums/:id", function (req, res) {
>>>>>>> 7d8ad6f1b82cf7f544da1993e79a7b4878fd01cd
		res.render("album");
	});

	// route testing
	app.get("/route-test", function (req, res) {
		res.sendFile(path.join(__dirname, "../public/html/route-test.html"));
	});
};
