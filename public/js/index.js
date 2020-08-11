let parameters;

$(function () {
	console.log("load");

	function getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	/**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
	$.ajax({
		url: "/api/albums/all",
		method: "GET",
	}).then(function (response) {
		console.log(response);
		processResponse(response);
	});

	function processResponse(response) {
		var responseLength = response.length;
		var html = "";
		for (var i = 0; i < responseLength; i++) {
			var spotify_id = response[i].spotify_id;
			var imgURLMed = response[i].imgURLMed;
			var title = response[i].title;
			var artist = response[i].artist;

			html += `<div class="album-card bg-green-500 p-8 ml-64 max-w-lg text-center rounded overflow-hidden shadow-lg" data-id="${spotify_id}">`;
			html += `<img class="w-full" src = "${imgURLMed}" alt = "Album Cover" id = "album-cover-large" />`;
			html += "<div class=\"font-bold text-xl mb-2\">";
			html += `<h3 class="text-black" id="album-title">${title}</h3>`;
			html += `<h4 class="text-black" id="artist-title">${artist}</h4>`;
			html += "</div>";
			html += `<div class="accordion" id="comment-drawer-${spotify_id}" >`;
			html += "<form class=\"rounded px-8 pt-6 pb-8 mb-4\">";
			html += "<div class=\"mb-4\">";
			html +=
				"<label class=\"block text-gray-700 text-sm font-bold mb-2\" for=\"comment\">";
			html += "Comments";
			html += "</label >";
			html += `<div id="comment-div-${spotify_id}"></div>`;
			html += `<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment-${spotify_id}" type="text" placeholder="comment">`;
			html += `<button class="comment bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" data-id="${spotify_id}">`;
			html += `Post it!`;
			html += `</button > `;
			html += `</div > `;
			html += `</form > `;
			html += `</div > `;
			html += "</div >";
		}
		$("#all-albums").append(html);
		$(".accordion").hide();
		$(".album-card").on("click", function (event) {
			event.stopImmediatePropagation();
			let id = $(this).data("id");
			$("#comment-drawer-" + id).show();
			if ($('#comment-div-' + id).is(":empty")) {
				$.ajax({
					url: `/api/comment/${id}`,
					method: "GET",
				}).then(function (response) {
					processComments(response);
				});
			} else {
				console.log("open");


			}

		});

		$(".comment").on("click", function (event) {
			let id = $(this).data("id");
			var textInput = $("#comment-" + id).val();
			console.log("id is ", id);
			var newComment = {
				author: parameters.displayName,
				text: textInput,
				AlbumSpotifyId: id
			};

			$.post("/api/comment/" + id, newComment)
				// On success, run the following code
				.then(function () {
					console.log("posted");
					location.reload();
				});
		});
	}

	// get token from url
	parameters = getHashParams();
	console.log(parameters);
	if (parameters.access_token) {
		// delete token from url
		document.location.href = document.location.href.slice(
			0,
			document.location.href.indexOf("access_token")
		);

		$("#login").hide();
	} else {
		$("#login").show();
	}
});

function processComments(response) {
	console.log(response);
	console.log("this ", this);
	var responseLength = response.length;
	var html = "";
	if (response.length === 0) {
		return;
	} else {
		var id = response[0].AlbumSpotifyId;
	}
	for (var i = 0; i < responseLength; i++) {
		var text = response[i].text;
		var displayName = response[i].displayName;
		html += "<div class=\"comments\">";
		html += `<h5>${displayName}</h5>`;
		html += `<p>${text}</p>`;
	}
	$("#comment-div-" + id).append(html);
}

$("#album-search").on("click", function (event) {
	console.log("test");
	event.preventDefault();

	var album = $("#search-input").val();

	$.ajax({
		url: `/api/search/${album}`,
		method: "GET",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#submit-comment").on("click", function (event) {
	console.log("dummy2");
	var text = $("#comment-text").val();
	$.ajax({
		url: `/api/comment/${text}`,
		method: "POST",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#album-add").on("click", function (event) {
	var id = $("#id-input").val();
	id = id.split(":");
	id = id[2];
	console.log(id);
	console.log(parameters.access_token);
	if (parameters.access_token) {
		console.log("albumAdd");
		console.log(`/add/${id}/${parameters.access_token}`);
		$.ajax({
			url: `/add/${id}/${parameters.access_token}`,
			method: "GET",
		}).then(function (response) {
			console.log("data back");
			// $("").text(JSON.stringify(response));
			location.reload();
		});
	}
});
