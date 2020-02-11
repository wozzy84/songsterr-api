import React, { useEffect } from 'react';
import {useState} from 'react'
 
const Pagination = ( {searchClick, filters, passPageNumber, recordsPerPage, totalRecords, paginate }) => {
  const pageNumbers = [];
  const [activeLink, setActiveLink] = useState("0");
  const style = {
    border: "0.75px solid gray",
 }

  useEffect(()=>{
    setActiveLink(0)
    paginate(1)
    document.querySelector('.results__list').scrollTo(0, 0)
  },[filters,searchClick])

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick =(e) => {
    setActiveLink(e.currentTarget.id)
    document.querySelector('.results__list').scrollTo(0, 0)
    passPageNumber(e.currentTarget.id)
 
  }

  if (pageNumbers.length > 1) {
      return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map((number, index) => (
            <li key={number} id={index}  onClick={(e) => paginate(number)} onMouseDown={handleClick}className='pagination__item'
            style={activeLink===index &&pageNumbers.length? style: null}>
              <a className='pagination__link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  else {
      return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map((number, index) => (
            <li key={number} id={index} onClick={handleClick}className='pagination__item'
            style={{display: "hidden"}}>
            </li>
          ))}
        </ul>
    </nav>
  );
 }
};

export default Pagination;
