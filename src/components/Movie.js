import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  function deleteHandler(id)
  {
     const response=fetch(`https://react-first-6bd48-default-rtdb.firebaseio.com/movies/${id}.json`,
     {
      method:'DELETE',
     })
  } 

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={(e)=>{deleteHandler(props.id,e)}}>DELETE</button>
    </li>
  );
};

export default Movie;
