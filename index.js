const targetUrl = "https://tube.ibomma.pw/telugu-movies/";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const OMDBapikey = "352838b6";
const OMDBurl = `https://www.omdbapi.com/?apikey=${OMDBapikey}`;

const mainDiv = document.getElementById("mainDiv");
const minRatingDisplay = document.getElementById("minRatingDisplay");
const minRating = document.getElementById("minRating");
let presentMinRating = 7.5;

minRating.addEventListener("input", function () {
  minRatingDisplay.textContent = this.value;
  presentMinRating = this.value;
});

async function main() {
  mainDiv.innerHTML = "";
  const load = document.createElement("img");
  load.src = "./images/loading.gif";
  mainDiv.append(load);

  try {
    const response = await fetch(proxyUrl + targetUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const movies = doc.querySelectorAll(".entry-title");
    mainDiv.innerHTML = "";
    for (let movie of movies) {
      let name = movie.textContent.substring(0, movie.textContent.length - 4);
      let year = movie.textContent.substring(movie.textContent.length - 4);
      let link = movie.querySelector("a").href;

      let fullURL = OMDBurl + `&t=${name}&y=${year}`;
      const movieDataResponse = await fetch(fullURL);
      const movieData = await movieDataResponse.json();

      if (movieData.Response == "False") continue;
      let rating = movieData.imdbRating;
      if (rating < presentMinRating || rating === "N/A") continue;

      const div = document.createElement("div");

      const h3 = document.createElement("h3");
      h3.textContent = `Movie title: ${movieData.Title}`;
      h3.setAttribute("style", "width:90%;color:darkred");

      const img = document.createElement("img");
      img.src = movieData.Poster;
      img.setAttribute("style", "width:50%;border-radius:3%");

      const p = document.createElement("p");
      p.textContent = `PLOT: ${movieData.Plot}`;
      p.setAttribute("style", "width:90%");

      const h41 = document.createElement("h4");
      h41.textContent = `IMDB rating: ${movieData.imdbRating}`;
      h41.setAttribute("style", "width:90%");

      const h42 = document.createElement("h4");
      h42.textContent = `Genre: ${movieData.Genre}`;
      h42.setAttribute("style", "width:90%");

      const h43 = document.createElement("h4");
      h43.textContent = `Runtime: ${movieData.Runtime}`;
      h43.setAttribute("style", "width:90%");

      const h44 = document.createElement("h4");
      h44.textContent = `Type: ${movieData.Type}`;
      h44.setAttribute("style", "width:90%");

      const a = document.createElement("a");
      a.textContent = `open ${movieData.Title}`;
      a.href = link;
      a.setAttribute("style", "width:90%");

      div.append(h3, img, h41, h42, h44, h43, p, a);
      div.classList.add("small-div");
      div.setAttribute("style", "background-color:rgb(120, 160, 131)");

      mainDiv.append(div);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
