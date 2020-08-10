let token;

(function () {
  console.log("load");
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
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
  // get token from url
  token = getHashParams();

  if (token.access_token) {
    // delete token from url
    document.location.href = document.location.href.slice(
      0,
      document.location.href.indexOf("access_token")
    );
  } else {}
})();
console.log(token);

