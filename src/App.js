import React from "react";
import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

let id;

function App() {
  const [movies, setMovies] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);


  let response;

   async function fetchDataHandler() {
    setPageLoading(true);
    setError(null);
      try {
       response =await fetch("https://swapi.dev/api/film/");

      id=setInterval(() => {
         response = fetch("https://swapi.dev/api/film/")
      }, 5000); 

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }

      const data =await response.json();

      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setPageLoading(false);
  }
 
   const cancelHandler=()=>
    {
      clearInterval(id)
    } 
    
   

  return( 
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        <button onClick={cancelHandler}>CANCEL</button>
      </section>
      <section>
        {!pageLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!pageLoading && movies.length === 0 && !error && (
          <p>No Movies Found</p>
        )}
        {!pageLoading && error && <p>{error}</p>}
        {pageLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
