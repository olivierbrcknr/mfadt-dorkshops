// React
import React, { useEffect, useState, useRef } from 'react'

import Airtable from 'airtable'
import moment from 'moment'

// Components
import Head from '../components/Head'

import EmailTemplate from '../components/EmailTemplate'

// Utils
import {getSheetData} from '../components/utils/google_sheet'

const Email = ({ sheetData }) => {

  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  let classes = ['email']

  useEffect(()=>{
    setData( sheetData )
  },[sheetData])

  return (
    <div className={classes.join(' ')}>

      <Head title="Dorkshops" />

      <div className="wrapper">

        <EmailTemplate data={data} />

      </div>

    </div>
  )
}

export async function getStaticProps() {
  const sheetData = await getSheetData()

  return {
    props: { sheetData },
    // revalidate: 10, // In seconds
  }
}

export default Email
