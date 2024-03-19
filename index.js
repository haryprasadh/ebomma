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
    const response = await fetch(targetUrl);
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
      const span1 = document.createElement("span");
      span1.textContent = `${movieData.Title}`;
      span1.className = "highlight";
      h3.appendChild(span1);
      h3.setAttribute("style", "width:90%;");

      const img = document.createElement("img");
      img.src = movieData.Poster;
      img.setAttribute("style", "width:50%;border-radius:3%");

      const h5 = document.createElement("h5");
      const span2 = document.createElement("span");
      span2.textContent = "PLOT: ";
      span2.className = "highlight2";
      h5.appendChild(span2);
      h5.appendChild(document.createTextNode(movieData.Plot));
      h5.setAttribute("style", "width:90%");

      const h41 = document.createElement("h4");
      const span3 = document.createElement("span");
      span3.textContent = "IMDB rating: ";
      span3.className = "highlight2";
      h41.appendChild(span3);
      h41.appendChild(document.createTextNode(movieData.imdbRating));
      h41.setAttribute("style", "width:90%");

      const h42 = document.createElement("h4");
      const span4 = document.createElement("span");
      span4.textContent = "Genre: ";
      span4.className = "highlight2";
      h42.appendChild(span4);
      h42.appendChild(document.createTextNode(movieData.Genre));
      h42.setAttribute("style", "width:90%");

      const h43 = document.createElement("h4");
      const span5 = document.createElement("span");
      span5.textContent = "Runtime: ";
      span5.className = "highlight2";
      h43.appendChild(span5);
      h43.appendChild(document.createTextNode(movieData.Runtime));
      h43.setAttribute("style", "width:90%");

      const h44 = document.createElement("h4");
      const span6 = document.createElement("span");
      span6.textContent = "Type: ";
      span6.className = "highlight2";
      h44.appendChild(span6);
      h44.appendChild(document.createTextNode(movieData.Type));
      h44.setAttribute("style", "width:90%");

      const a = document.createElement("a");
      a.textContent = `open ${movieData.Title}`;
      a.href = link;
      a.setAttribute("style", "width:90%");

      div.append(h3, img, h41, h42, h44, h43, h5, a);
      div.classList.add("small-div");
      div.setAttribute("style", "background-color:rgb(120, 160, 131)");

      mainDiv.append(div);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
