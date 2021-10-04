// React
import React, { useEffect, useState, useRef } from 'react'

import Airtable from 'airtable'
import moment from 'moment'

// Components
import Head from '../components/Head'

import EmailTemplate from '../components/EmailTemplate'

// Utils
// import {getSheetData} from '../components/utils/google_sheet'
import {getAirtableData} from '../components/utils/airtable'

const Email = (/*{ sheetData }*/) => {

  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  let classes = ['email']

  /*
  useEffect(()=>{
    setData( sheetData )
  },[sheetData])
  */

  useEffect(async ()=>{
    let airtableData = await getAirtableData()
    setData( airtableData )
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

/*
export async function getStaticProps() {
  const sheetData = await getSheetData()

  return {
    props: { sheetData },
    // revalidate: 10, // In seconds
  }
}
*/

export default Email
