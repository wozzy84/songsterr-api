import React from 'react';


const ResultList = ({ records }) => {

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



  return (
    <section style={records.length? {display:"1"}: {opacity: "0"}}className="results">
      <ul className="results__list">
      {records.map((e, index) => (
      <li className="list-element">
        <span className="list-element__number">{index+1}.</span>
        <span className="list-element__description">
          <span className="list-element__title">{e.title}</span>
          <span className="list-element__artist">{e.artist.name}</span>  
        </span>
      <span className="list-element__tab-types">{e.tabTypes.map((e, index)=> {return <span className="list-element__type">{trimTabTypes(e)}</span>})}</span>
        
        </li>
      ))}
      </ul>
</section>
  );
};

export default ResultList;
