import React from 'react'
import Link from 'next/link'
import Obfuscate from 'react-obfuscate';
import Moment from 'react-moment';

import styles from './DorkshopEntry.module.css';

const DorkshopEntry = (props) => {

  let classes = [styles.DorkshopEntry]
  classes.push(props.className)

  const info = props.fields

  const dateFormat = "LLLL"
  const dateFormatEnd = "LT"

  const durationInMinutes = info.Duration / 60

  return (
    <div className={classes.join(" ")}>

      <h2>
        { info.Title }
      </h2>

      <p className={styles.personInfo}>
        { info.Person }
        <Obfuscate email={info.Email}
          headers={{
            subject: "Dorkshop: " + info.Title
          }} >
          <span className={styles.emailButton + " button"}>
            email
          </span>
        </Obfuscate>
      </p>

      <div className={styles.dateInfo}>
        <Moment format={dateFormat}>{info.Date}</Moment> - <Moment format={dateFormatEnd} add={{ minutes: durationInMinutes }}>{info.Date}</Moment> {info.Place ? '— '+info.Place : null}
      </div>

      <p className={styles.description}>
        { info.Description }
      </p>

    </div>
  )
}

export default DorkshopEntry
