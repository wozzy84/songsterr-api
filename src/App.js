import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faSearch}  from '@fortawesome/free-solid-svg-icons'
import ResultList from './components/ResultList/ResultList'


function App() {

  //state
  const [inputValue, setInputValue] = useState('')
  const [lastQueury, setLastQuery] = useState('')
  const [searchClick, setSearchClick] = useState(null)
  const [queryResults, setQueryResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
  const [filters, setFilters] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])

  //variables
  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
  const style = {backgroundColor: "#7acc54", color: "white", border: "0.75px solid transparent"}

  //functions
  const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
  }

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    if(inputValue.length>2){
    setSearchClick(!searchClick)
    setFilters([])
    }
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
        [...filters,e.currentTarget.id].filter(e=> e!=="all"))
    } else {
      setFilters(filters.filter(el=>  el!==e.currentTarget.id))
    }

  }

  useEffect(() => {
    if(searchClick!=null) {
    fetch(`http://www.songsterr.com/a/ra/songs.json?pattern=${inputValue}`)
      .then((res) => res.json())
      .then((res) => {
        setQueryResults(res)
        setLastQuery(inputValue)
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
      <div className="container">   
        <section className="search" >
          <h1 className="search__title" style={queryResults.length? {opacity:0}: null}>Search over 500,000 tabs</h1>
          <form style={queryResults.length? {animation:  "myship 1s forwards"}: null}className="search__form" onSubmit={handleSubmit}>
            <div className="search__group">
              <input className="search__input"
                placeholder="Search for..." value={inputValue}
                onChange={handleInputChange}
              />
              <button className="search__button" type='button' onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faSearch}/>
                <span className="search__button-text">Search</span> 
              </button>
            </div>
          <div className="search__filters" style={queryResults.length? {opacity:"1", height:"auto"}: {opacity:"0", height:"0", padding: "0", border: 'none'}}>
            <div className="search__buttons-container">
              <h4>Filter:</h4>
              <button className="search__filter-button" type="button" id="all" onClick={handleFilterButton} style={filters.includes("all")?  style: null}>All</button>
              <button className="search__filter-button" type="button" id="CHORDS" onClick={handleFilterButton} style={filters.includes("CHORDS")?  style: null}>Chords</button>
              <button className="search__filter-button" type="button" id="TEXT_BASS_TAB" onClick={handleFilterButton} style={filters.includes("TEXT_BASS_TAB")?  style: null}>Bass</button>
              <button className="search__filter-button" type="button" id="TEXT_GUITAR_TAB" onClick={handleFilterButton} style={filters.includes("TEXT_GUITAR_TAB")?  style: null}>Guitar</button>
              <button className="search__filter-button" type="button" id="PLAYER" onClick={handleFilterButton} style={filters.includes("PLAYER")?  style: null}>Player</button>
            </div>
            <p className="search__result-summary">{filteredRecords.length} {filteredRecords.length===1? "search result" : "search results" } for "{lastQueury}"</p>
          </div>
          <ResultList records={currentRecords}
            recordsPerPage={recordsPerPage}
            totalRecords={filteredRecords.length}
            paginate={paginate}
            filters={filters}
            searchClick={searchClick}/>
        </form>    
      </section>
      </div>
    </>
  );

}
export default App;


