// React
import React, { useEffect, useState, useRef } from 'react'

import Airtable from 'airtable'
import moment from 'moment'

// Components
import Head from '../components/Head'

import EmailTemplate from '../components/EmailTemplate'

const Email = () => {

  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  let classes = ['email']

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

  return (
    <div className={classes.join(' ')}>

      <Head title="Dorkshops" />

      <div className="wrapper">

        <EmailTemplate data={data} />

      </div>

    </div>
  )
}

export default Email
