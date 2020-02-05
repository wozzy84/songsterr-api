import React, {useEffect, useState} from 'react';
import {ResultList} from '../src/components/ResultList/ResultList'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [searchClick, setSearchClick] = useState(null)
  const [queryResults, setQueryResults] = useState({})
  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    setSearchClick(!searchClick)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleButtonClick(e)
  }
  
  useEffect(() => {
    if(searchClick!=null) {
    fetch(`http://www.songsterr.com/a/ra/songs.json?pattern=${inputValue}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQueryResults(res)
        setInputValue("")
       
      })
      .catch((err) => {
        console.log(err);
      })
  
    }  }, [searchClick])
  return (
    <>
      <section className="search" >
        <h1 className="search__title">Search over 500,000 tabs</h1>
        <form className="search__form" onSubmit={handleSubmit}>
          <input className="search__input"
          placeholder="Search for..." value = {inputValue}
          onChange={handleInputChange}
         />
        <button type='button' onClick={handleButtonClick}>Search</button>
      </form>
      <ResultList results={queryResults}/>
      </section>
      
    </>
  );
}

export default App;


