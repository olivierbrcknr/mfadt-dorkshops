// React
import React, { useEffect, useState, useRef } from 'react'

import Airtable from 'airtable'

// Components
import Head from '../components/Head'
import Footer from '../components/Footer'

import FilterBar from '../components/FilterBar'
import Dorkshop from '../components/DorkshopEntry'

const Home = () => {

  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  let classes = ['home']

  const getData=()=>{

    let pseudoData = []

    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID)

    base('DorkshopList').select({
      view: 'Grid view'
    }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      records.forEach(function(record) {
        console.log('Retrieved', record.get('Title'))
        pseudoData.push(record)
      })
      setData( pseudoData )
    })
  }

  useEffect(()=>{
    getData()
  },[])


  // function to collect participants
  const signUpAdd = () => {

  }


  const filteredEntries = data.filter(d => d.fields.Title.toLowerCase().includes(search.toLowerCase()) )

  let entries = filteredEntries.map( (d,k) =>{
    return <Dorkshop key={k} passKey={k} fields={d.fields} />
  } )


  if( entries.length <= 0 ){
    entries = <div className="noDorkshopInfo">
      // Sorry, there is no dorkshop right now :/
    </div>
  }

  return (
    <div className={classes.join(' ')}>

      <Head title="Home" />

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
          The entries are sorted by date
        </div>

        <div className="dorkshopList">
          {entries}
        </div>


        <Footer />

      </div>

    </div>
  )
}

export default Home
