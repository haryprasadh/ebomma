const mainDiv = document.getElementById("mainDiv");

async function main() {
  mainDiv.innerHTML = "";
  const load = document.createElement("img");
  load.src = "./loading.gif";
  mainDiv.append(load);

  const targetUrl = "https://tube.ibomma.pw/telugu-movies/";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const OMDBapikey = "352838b6";
  const OMDBurl = `https://www.omdbapi.com/?apikey=${OMDBapikey}`;

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
      if (rating < 8 || rating === "N/A") continue;

      const div = document.createElement("div");

      const h3 = document.createElement("h3");
      h3.textContent = `Movie title: ${movieData.Title}`;
      h3.setAttribute("style", "width:20vw;color:darkred");

      const img = document.createElement("img");
      img.src = movieData.Poster;
      img.setAttribute("style", "width:10vw;border-radius:3%");

      const p = document.createElement("p");
      p.textContent = `PLOT: ${movieData.Plot}`;
      p.setAttribute("style", "width:20vw");

      const h41 = document.createElement("h4");
      h41.textContent = `IMDB rating: ${movieData.imdbRating}`;
      h41.setAttribute("style", "width:20vw");

      const h42 = document.createElement("h4");
      h42.textContent = `Genre: ${movieData.Genre}`;
      h42.setAttribute("style", "width:20vw");

      const h43 = document.createElement("h4");
      h43.textContent = `Runtime: ${movieData.Runtime}`;
      h43.setAttribute("style", "width:20vw");

      const h44 = document.createElement("h4");
      h44.textContent = `Type: ${movieData.Type}`;
      h44.setAttribute("style", "width:20vw");

      const a = document.createElement("a");
      a.textContent = `open ${movieData.Title}`;
      a.href = link;

      div.append(h3, img, h41, h42, h44, h43, p, a);
      mainDiv.append(div);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
