import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies,setMovies]=useState([]) 
  const [pageLoading,setPageLoading]=useState(false)

  async function fetchDataHandler(){
    setPageLoading(true)
    const response=await fetch('https://swapi.dev/api/films/')
     const data =await response.json()

      const transformedData=data.results.map((movieData)=>{
         return{
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date,
         }         
      })
      setMovies(transformedData);
      setPageLoading(false)
    }

  return (
    <React.Fragment>
      <section>
       <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {!pageLoading && movies.length>0 && <MoviesList movies={movies}/>}
        {!pageLoading && movies.length===0 && <p>No Movies Found</p>}
        {pageLoading && <p>Loading...</p>}

      </section>
    </React.Fragment>
  );
}

export default App;

