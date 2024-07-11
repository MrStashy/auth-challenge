/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import AddNewMovieform from "./AddNewMovieForm";
import { useEffect, useState } from "react";



export default function MoviesPage({ user }) {
  const [movies, setMovies] = useState([])

  async function getMovies() {
    
    const data = await fetch("http://localhost:3000/movies", {
      method: "GET",
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    })
    const json = await data.json()
    setMovies(json.movies)
  }


  useEffect(() => {
    getMovies()
  }, [])


  return (
    <div className="grid place-items-center">
      <h1 className="text-4xl my-4">The Boolean Movie Database</h1>
      <p className="my-2">{`${user.username}`}'s Movies</p>
      <ul className="flex flex-row flex-wrap gap-2 place-items-center justify-evenly">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ul>

      <AddNewMovieform getMovies={getMovies}/>
    </div>
  );
}
