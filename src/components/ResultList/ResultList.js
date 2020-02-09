import React, {useState, useEffect }from 'react';
import Pagination from '../Pagination/Pagination'
;


const ResultList = (props) => {
  const [currentPage,setCurrentPage] = useState(0)

const trimTabTypes = (tabType) => {
 
    switch (tabType) {
      case "TEXT_GUITAR_TAB":
        return "GUITAR"
      case "TEXT_BASS_TAB":
        return "BASS"
      default:
        return tabType
    }
  
}

useEffect(()=>{
  setCurrentPage(0)
  console.log(props.filters)
},[props.filters])


  const handlePassPageNumber =  (e) => {
    setCurrentPage(e)
  }


  return (
    <>
    <section style={props.records.length? {opacity:"1", height:"auto"}: {opacity: "0", height: "0"}}className="results">
      <ul className="results__list">
      {props.records.map((e, index) => (
      <li className="list-element">
        <span className="list-element__number">{index+1+currentPage*50}.</span>
        <span className="list-element__description">
          <span className="list-element__title">{e.title}</span>
          <span className="list-element__artist">{e.artist.name}</span>  
        </span>
      <span className="list-element__tab-types">{e.tabTypes.map((e, index)=> {return <span className="list-element__type">{trimTabTypes(e)}</span>})}</span>
        
        </li>
      ))}
      </ul>
      <Pagination
        passPageNumber={handlePassPageNumber}
        recordsPerPage={props.recordsPerPage}
        totalRecords={props.totalRecords}
        paginate={props.paginate}
        filters={props.filters}
        searchClick={props.searchClick}
    />
</section>
      
  </>
  );
};

export default ResultList;
