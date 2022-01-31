const API_KEY = "d064d0ef";

const API_KEY_TMDB = "59fa8444756687ba308045a182014097";
const base_Url = "https://image.tmdb.org/t/p/original";
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").onsubmit = function () {
    const movie = document.querySelector("#movie__name").value.toUpperCase();
    let length = movie.length;
    if (length < 1) {
      alert("Movie name cannot be empty");
    } else {
      //console.log(movie);

      Promise.all([
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`)
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            if (data.Response == "False") {
              alert(data.Error);
            } else {
              document.querySelector("#results__section").innerHTML = "";
            }
            const { Search = [], totalResults = 0 } = data;
            Promise.all(
              Search.map((search) =>
                fetch(
                  `http://www.omdbapi.com/?apikey=${API_KEY}&i=${search.imdbID}`
                ).then((res) => res.json())
              )
            ).then((singleRes) => {
              console.log(singleRes);
              //   function appendData(data) {
              var mainContainer = document.getElementById("movies");
              for (var i = 0; i < singleRes.length; i++) {
                let plot = singleRes[i].Plot;
                let poster = singleRes[i].Poster;
                let title = singleRes[i].Title;
                let year = singleRes[i].Year;
                //console.log(year);

                //CREATE ELEMENT
                const para = document.createElement("li");
                let movieImage = document.createElement("div");
                const movie__title = document.createElement("p");
                movie__title.innerHTML = title;
                para.innerHTML = plot;
                movieImage.innerHTML = `<img alt='movie-image'src=${poster}/>`;

                para.appendChild(movie__title);

                // // Append to another element:
                document.getElementById("results__section").appendChild(para);
                document
                  .getElementById("results__section")
                  .appendChild(movieImage);
              }
            });
          })
          .catch((error) => {
            document.querySelector("#result").innerHTML =
              "Ooops something went wrong";
          }), //add other
      ]);
    }

    return false;
  };
  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY_TMDB}`) //all trending movies
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      const trending = data.results;
      const keys = Object.values(trending);
      const prop = keys[Math.floor(Math.random() * keys.length)];
      //console.log(prop);
      //trending__title
      const title = "Trending:  " + prop.original_title;
      if (title == undefined) {
        const title2 = "Trending:  " + prop.original_name;
        document.querySelector("#trending__title").innerHTML = `${title2}`;
      } else {
        document.querySelector("#trending__title").innerHTML = `${title}`;
      }
      console.log(title);
      const img = prop.backdrop_path;
      const imgUrl = base_Url.concat(img);
      //console.log(imgUrl);
      const step1 = "url('";
      const step2 = imgUrl;
      const step3 = "')";

      const step4 = step1.concat(step2).concat(step3);
      console.log(step4);

      //const bg__image = "url('https://images.alphacoders.com/120/1201058.jpg')";

      document.getElementById("site__body").style.backgroundImage = `${step4}`;
      // document.querySelector("#img3").innerHTML = `${imgUrl}`;

      //work on images dynamic display
      //   document.getElementById("site__body").style.backgroundImage = `${bg__image}`;
    });
});
