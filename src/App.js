import React, { useCallback } from "react";
import { useState ,useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

//let id;

function App() {
  const [movies, setMovies] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);

   const fetchDataHandler=useCallback(async()=> {
    setPageLoading(true);
    setError(null);
      try {
       const response =await fetch('https://react-first-6bd48-default-rtdb.firebaseio.com/movies.json');

      /*id=setInterval(() => {
         response = fetch("https://swapi.dev/api/film/")
      }, 5000);*/ 

      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }

      const data =await response.json();

      const transformedData=[];

      for(const key in data)
      {
        transformedData.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate, 
        })
      }

      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setPageLoading(false);
  },[])
 
  useEffect(()=>
  {
    fetchDataHandler()
  },[fetchDataHandler])

  async function  addMovieHandler(NewMovieObj)
  {
    const response=await fetch('https://react-first-6bd48-default-rtdb.firebaseio.com/movies.json', 
    {
      method:'POST',
      body:JSON.stringify(NewMovieObj),
      headers : {
        'Content-Type':'application/json'
      }
    }) 
    const data=await response.json()
  }

  async function deleteHandler(id)
  {
     const response=await fetch('https://react-first-6bd48-default-rtdb.firebaseio.com/movies.json',
     {
      method:'DELETE',
      data:id,
     })
     const data=await response.json()
  }

  /* const cancelHandler=()=>
    {
      clearInterval(id)
    } */ 
    
   

  return( 
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler}></AddMovies>
      </section>
      <section>
      <button onClick={deleteHandler}>DELETE</button>
      </section>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
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
