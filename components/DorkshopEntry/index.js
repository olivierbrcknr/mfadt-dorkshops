import React from 'react'
import Link from 'next/link'
import Obfuscate from 'react-obfuscate'
import Moment from 'react-moment'
import moment from 'moment'

import { ICalendar, GoogleCalendar } from 'datebook'


import styles from './DorkshopEntry.module.css'

const DorkshopEntry = (props) => {

  let classes = [styles.DorkshopEntry]
  classes.push(props.className)

  const info = props.fields

  const dateFormat = "LLLL"
  const dateFormatEnd = "LT"

  const durationInMinutes = info.Duration / 60

  const startDate = new Date( info.Date )
  const endDate = moment( info.Date ).add(durationInMinutes, 'minutes').toDate()

  let isNow = moment().diff(info.Date,'minutes') >= 0 ? true : false

  const calendarEventConfig = {
    title: 'Dorkshop: ' + info.Title,
    location: info.Place,
    description: info.Description,
    start: startDate,
    end: endDate,
  }

  const googleCalendarEvent = new GoogleCalendar( calendarEventConfig )
  const icalendarEvent = new ICalendar( calendarEventConfig )


  return (
    <div className={classes.join(" ")}>

      <h2>
        { info.Title } { isNow ? <span className={styles.isNow}>→ is running now</span> : null }
      </h2>

      <p className={styles.personInfo}>
        { info.Person }
        <Obfuscate email={info.Email}
          headers={{
            subject: "Dorkshop: " + info.Title
          }} >
          <span className={styles.emailButton}>
            email
          </span>
        </Obfuscate>
      </p>

      <div className={styles.dateInfo}>
        <Moment format={dateFormat}>{info.Date}</Moment> - <Moment format={dateFormatEnd} add={{ minutes: durationInMinutes }}>{info.Date}</Moment> {info.Place ? '— '+info.Place : null}

        <a className={styles.calenderEvent} href={ googleCalendarEvent.render() } target="_blank">
          Google Calendar
        </a>

        <span className={styles.calenderEvent} onClick={ () => icalendarEvent.download() }>
          iCal Event
        </span>

      </div>

      <p className={styles.description}>
        { info.Description }
      </p>

    </div>
  )
}

export default DorkshopEntry
