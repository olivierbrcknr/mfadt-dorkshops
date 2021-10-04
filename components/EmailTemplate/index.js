import React, { useRef } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'
import Obfuscate from 'react-obfuscate'
import Moment from 'react-moment'
import moment from 'moment'

import styles from './EmailTemplate.module.css'

const EmailTemplate = (props) => {

  const emailContent = useRef(null)

  let classes = [styles.EmailTemplate]
  classes.push(props.className)

  let entries = "no dorkshops this week"

  const dateFormat = "LLLL"
  const dateFormatEnd = "LT"

  const filteredEntries = props.data.filter(d => moment().diff(d.StartDate,'days') <= 0  )

  if( filteredEntries.length > 0 ){
    entries = filteredEntries.map( (d,k) =>{

      const info = d

      return <div key={"dorkshop-"+k}>

        <b>
          { info.Title }
        </b>
        <p className={styles.personInfo}>
          { info.Person } — <Obfuscate email={info.Email}/>
        <br/>
          <Moment format={dateFormat}>
            {info.StartDate}
          </Moment> - <Moment format={dateFormatEnd}>
            {info.EndDate}
          </Moment> {info.Place ? '— '+info.Place : null}
        </p>

        { info.Description.split(/\n/).map(line => <p className={styles.description}>{line}</p>) }

        <p>
          ———————
        </p>

      </div>
    } )
  }


  const copyText = () => {

    console.log( emailContent.current.innerHTML )

    const blobInput = new Blob([emailContent.current.innerHTML], {type: 'text/html'});
    const clipboardItemInput = new ClipboardItem({'text/html' : blobInput});


    // copy code
    navigator.clipboard.write([clipboardItemInput])
    // navigator.clipboardData.setData("text/plain", str);


    // toast
    toast.notify('✅ copied!', {
      duration: 2,
      type: "success",
      title: "Success",
      position: "top"
    })
  }


  return (
    <div className={classes.join(" ")}>

      <div className={styles.EmailHeader}>
        <span className={styles.EmailHeaderInfo}>To:</span> MFADT<br/>
        <span className={styles.EmailHeaderInfo}>Subject:</span> Dorkshops this month

        <div onClick={()=>copyText()} className={styles.CopyBtn}>
          Copy Email
        </div>

      </div>

      <div ref={emailContent} className={styles.EmailContent}>


        <p>
          Hello everyone!
        </p>
        <p>
          Here are this months dorkshops:
        </p>

        <br/>

        <p>
          ———————
        </p>


        {entries}

        <br/>

        <p>
          We hope there is something in there for you! Also, check the <a href="https://mfadt.parsons.edu/dorkshops/">dorkshop website</a> to see upcoming dorkshops.
        </p>
        <p>
          Do you want to give a dorkshop? Send us an email or fill out <a href="https://airtable.com/shrGl9Ymp2a4u1iXy">this form</a>.
        </p>
        <p>
          — The dorkshop team
        </p>

      </div>

      <ToastContainer align={"center"} position={"top"} />

    </div>
  )
}

export default EmailTemplate
