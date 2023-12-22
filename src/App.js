import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
  const [inputValue, setInputValue] = useState('')
  const [isAdult, setIsAdult] = useState(false);
  const [img, setImg] = useState('')
  const [title, setTitle] = useState('')
  const [rate, setRate] = useState('')
  const [count, setCount] = useState('')
  const [id, setId] = useState('')
  const [trigger, setTrigger] = useState(0); // Add this line
  const getFilm = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=${isAdult}&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        getrandomMovieInfo(response)
      })
      .catch(err => console.error(err));
  }
  function handleCheckboxChange(e){
    setIsAdult(e.target.checked);
  }
  function handleChange(e){
    setInputValue(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault();
    getFilm()
  }
  function getrandomMovieInfo(response){
    const random = Math.floor(Math.random()*response.results.length)
    const randomMovie = response.results[random]
    setImg(randomMovie.poster_path)
    setTitle(randomMovie.original_title)
    setRate(randomMovie.vote_average)
    setCount(randomMovie.vote_count)
    setId(randomMovie.id)
    setTrigger(prevTrigger => prevTrigger + 1); // Add this line
    console.log(random)
  }
  useEffect(() => {
    console.log(img);
  }, [img]);
  useEffect(() => {
    if (rate < 5 || count < 1000){
      getFilm()
    }
  }, [trigger]);
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type='checkbox' checked={isAdult} onChange={handleCheckboxChange}/> Include adult content
          <input type='text' value={inputValue} onChange={handleChange}/>
          <input type='submit'/>
        </form>
        <h3>Movie Name</h3>
        <h1>{title}</h1>
        <h3>Movie Rate</h3>
        <h1>{rate} / 10</h1>
        <h3>Rate count</h3>
        <p>{count}</p>
        <h3>Poster</h3>
        <img src={`https://image.tmdb.org/t/p/w500${img}`} alt='poster'/>
        <pre>{img}</pre>
      </header>
    </div>
  );
}

export default App;
