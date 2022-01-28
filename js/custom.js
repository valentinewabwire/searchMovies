const API_KEY = "d064d0ef";

document.addEventListener("DOMContentLoaded", function () {
  Promise.all([
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=merlin`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { Search = [], totalResults = 0 } = data;
        // const searchResults = data.Search;
        Promise.all(
          Search.map((search) =>
            fetch(
              `http://www.omdbapi.com/?apikey=${API_KEY}&i=${search.imdbID}`
            ).then((res) => res.json())
          )
        ).then((singleRes) => {
          console.log(singleRes);
          // let searchOutput = data.Search;
          // if (data.res == "False") {
          //   alert(data.Error);
          // }
          // console.log(searchOutput);

          //   function appendData(data) {
          var mainContainer = document.getElementById("movies");
          for (var i = 0; i < singleRes.length; i++) {
            let plot = singleRes[i].Plot;
            let poster = singleRes[i].Poster;

            // Create element:
            const para = document.createElement("li");
            let movieImage = document.createElement("div");
            para.innerHTML = plot;
            movieImage.innerHTML = `<img alt='movie-image'src=${poster}/>`;

            // Append to another element:
            document.getElementById("moviesDesc").appendChild(para);
            document.getElementById("movieContent").appendChild(movieImage);
            // const li = document.createElement("li");
            // li.innerHTML =
            //   "Plot: " +
            //   singleRes[i].Plot +
            //   "***Title******" +
            //   singleRes[i].Title +
            //   "**Rates***" +
            //   singleRes[i].Rated;
            // mainContainer.appendChild(li);
          }
          //   }
        });
        // document.querySelector("#result").innerHTML = `${movie}`;
        // document.querySelector("#moviegenre").innerHTML = `${genre1}`;
        // document.querySelector("#text__header").innerHTML = `${movie}`;
        // document.getElementById("posterImg").src = `${imgUrl}`;
      }),
  ]);

  return false;
});
