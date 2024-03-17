const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const OMDBapikey = "352838b6";
const OMDBurl = `https://www.omdbapi.com/?apikey=${OMDBapikey}`;

const mainDiv = document.getElementById("mainDiv");

async function main() {
  let html = await fetch("https://tube.ibomma.pw/telugu-movies/").then((res) =>
    res.text()
  );

  let dom = new JSDOM(html);

  let movies = dom.window.document.querySelectorAll(".entry-title");
  for (let movie of movies) {
    let name = movie.textContent.substring(0, movie.textContent.length - 4);
    console.log(name);
    let year = movie.textContent.substring(movie.textContent.length - 4);
    let link = movie.querySelector("a").href;

    let fullURL = OMDBurl + `&t=${name}&y=${year}`;
    let movieData = await fetch(fullURL).then((res) => res.json());

    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = movieData.Title;
    const img = document.createElement("img");
    img.src = movieData.Poster;
    const p = document.createElement("p");
    p.textContent = movieData.Plot;
    const h41 = document.createElement("h4");
    h41.textContent = movieData.imdbRating;
    const h42 = document.createElement("h4");
    h42.textContent = movieData.Genre;
    const h43 = document.createElement("h4");
    h43.textContent = movieData.Runtime;
    const h44 = document.createElement("h4");
    h44.textContent = movieData.Type;
    div.append(h3, img, p, h41, h42, h43, h44);
    mainDiv.append(div);
  }
}
