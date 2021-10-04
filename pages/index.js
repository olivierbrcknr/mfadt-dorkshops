// React
import React, { useEffect, useState, useRef } from 'react'

import moment from 'moment'

// Components
import Head from '../components/Head'
import Footer from '../components/Footer'
import Background from '../components/Background'

import FilterBar from '../components/FilterBar'
import Dorkshop from '../components/DorkshopEntry'

// Utils
// import {getSheetData} from '../components/utils/google_sheet'
import {getAirtableData} from '../components/utils/airtable'

const Home = (/*{ sheetData }*/) => {

  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  let classes = ['home']

  /*
  // GOOGLE SHEETS
  useEffect(()=>{
    setData( sheetData )
  },[sheetData])
  */

  useEffect(async ()=>{
    let airtableData = await getAirtableData()
    setData( airtableData )
  },[])

  // function to collect participants
  const signUpAdd = () => {

  }

  const filteredEntries = data.filter(d =>{

    if( d.Title.toLowerCase().includes(search.toLowerCase()) && moment().diff(d.EndDate,'minutes') <= 0 ){
      return true
    }else{
      return false
    }
  })

  let entries = filteredEntries.map( (d,k) =>{
    return <Dorkshop key={k} passKey={k} fields={d} />
  } )

  if( entries.length <= 0 ){
    entries = <div className="noDorkshopInfo">
      // Sorry, there is no dorkshop right now :/
    </div>
  }

  return (
    <div className={classes.join(' ')}>

      <Head title="Dorkshops" />

      <Background />

      <div className="wrapper">

        <header>
          <h1>
            MFADT Dorkshops
          </h1>

          <p>
            Dorkshops <i>[from 'dork' and 'workshop']</i> are by students for students, here at <a href="https://www.newschool.edu/parsons/mfa-design-technology/">MFADT</a>.
          </p>

        </header>

        <div className="filters">
          <FilterBar onChange={ (v)=>{ setSearch(v) } } />
        </div>

        <div className="infoText">
          The entries are sorted by date. Only upcoming dorkshops are shown.
        </div>

        <div className="dorkshopList">
          {entries}
        </div>

        <div className="newEntry">
          You want to give a dorkshop? We are looking forward to it!<br/>

          <a href="https://docs.google.com/forms/d/e/1FAIpQLScBLMpVnizFyyapJ1PTbb3Sv_dPycEJXUeMqFN90u0SsrcWfQ/viewform?usp=sf_link" className="button">
            → enter your dorkshop
          </a>

        </div>

        <Footer />

      </div>

    </div>
  )
}

/*
export async function getStaticProps() {
  const sheetData = await getSheetData()

  return {
    props: { sheetData },
    // revalidate: 10, // In seconds
  }
}
*/

export default Home
