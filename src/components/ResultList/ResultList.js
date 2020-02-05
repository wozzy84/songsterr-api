import React from 'react'


const ResultList = (props) => {
  

const handleTabType = (types) => {
    types.map((e, index)=>{
        return "asda"
    })
}     

if (props.results.length){
        return (
        <>
        <section className="search">
        <ul>
            {props.results.map((e, index)=>{
                return <li>{index+1} {e.artist.name} {e.title} {e.tabTypes.join(', ')}</li>
            })}
        </ul>   
        </section>
        

        </>
    )
} else {
    return (
        <>
        </>
    )
}


}

export {ResultList}