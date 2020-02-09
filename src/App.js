import React, {useEffect, useState} from 'react';

import ResultList from './components/ResultList/ResultList'
import Pagination from './components/Pagination/Pagination'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [searchClick, setSearchClick] = useState(null)
  const [queryResults, setQueryResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const [filters, setFilters] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
  const style = {backgroundColor: "#7acc54", color: "white", border: "0.75px solid transparent"}

  const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
  }

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

  const handleFilterButton = (e) => {
    e.preventDefault()
    
    if(e.currentTarget.id==="all"){
      setFilters(["all"]);
      setFilteredRecords(queryResults)
    } else if(!filters.includes(e.currentTarget.id)){
      setFilters(
        [...filters,e.currentTarget.id].filter(e=> e!="all"))
    } else {
      setFilters(filters.filter(el=>  el!=e.currentTarget.id))
    }

  }
  
  useEffect(() => {
    if(searchClick!=null) {
    fetch(`http://www.songsterr.com/a/ra/songs.json?pattern=${inputValue}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQueryResults(res)
        setInputValue("")
        setFilteredRecords(res)
       
      })
      .catch((err) => {
        console.log(err);
      })
  
    }  }, [searchClick])

    useEffect(() =>{
      if(!filters.includes('all')) {
        const newArray = queryResults.filter(e => e.tabTypes.some(v=>filters.includes(v)))
        setFilteredRecords(newArray)
      }
    } ,[filters] )
  

  return (
    <>
      <section className="search" >
        <h1 className="search__title" style={queryResults.length? {opacity:0}: null}>Search over 500,000 tabs</h1>
        <form style={queryResults.length? {animation:  "myship 1s forwards"}: null}className="search__form" onSubmit={handleSubmit}>
          <input className="search__input"
          placeholder="Search for..." value = {inputValue}
          onChange={handleInputChange}
         />
        
        <button className="search__button" type='button' onClick={handleButtonClick}>Search</button>
        <div className="search__filters">
          <button className="search__filter-button" type="button" id="all" onClick={handleFilterButton} style={filters.includes("all")?  style: null}>All</button>
          <button className="search__filter-button" type="button" id="CHORDS" onClick={handleFilterButton} style={filters.includes("CHORDS")?  style: null}>Chords</button>
          <button className="search__filter-button" type="button" id="TEXT_BASS_TAB" onClick={handleFilterButton} style={filters.includes("TEXT_BASS_TAB")?  style: null}>Bass</button>
          <button className="search__filter-button" type="button" id="TEXT_GUITAR_TAB" onClick={handleFilterButton} style={filters.includes("TEXT_GUITAR_TAB")?  style: null}>Guitar</button>
          <button className="search__filter-button" type="button" id="PLAYER" onClick={handleFilterButton} style={filters.includes("PLAYER")?  style: null}>Player</button>
          <p>{filteredRecords.length} Results...</p>
          
        </div>
        <ResultList records={currentRecords}/>
      </form>
      
      </section>
  
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={filteredRecords.length}
        paginate={paginate}
      
      />
    </>
  );

}
export default App;


