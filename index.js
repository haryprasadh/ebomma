const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const OMDBapikey = "352838b6";
const OMDBurl = `https://www.omdbapi.com/?apikey=${OMDBapikey}`;

async function main() {
  let html = await fetch("https://tube.ibomma.pw/telugu-movies/").then((res) =>
    res.text()
  );

  let dom = new JSDOM(html);

  let movies = dom.window.document.querySelectorAll(".entry-title");
  for (let movie of movies) {
    let name = movie.textContent.substring(0, movie.textContent.length - 4);
    let year = movie.textContent.substring(movie.textContent.length - 4);
    let link = movie.querySelector("a").href;

    let fullURL = OMDBurl + `&t=${name}&y=${year}`;
    let movieData = await fetch(fullURL).then((res) => res.json());
    if (movieData.Response == "False") continue;

    console.log(movieData.Title);
    // console.log(movieData.Poster);
    console.log(movieData.Plot);
    console.log(movieData.imdbRating);
    console.log(movieData.Genre);
    console.log(movieData.Runtime);
    console.log(movieData.Type);
    console.log(link);
    console.log("////////////////////////////////////");
  }
}

main();
