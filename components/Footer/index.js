import React from 'react'
import Link from 'next/link'

import styles from './Footer.module.css'

const Footer = (props) => {

  let classes = [styles.Footer];
  classes.push(props.className);

  return (
    <footer className={classes.join(" ")}>
      MFADT &copy; 2021 — <a href="https://docs.google.com/forms/d/e/1FAIpQLScBLMpVnizFyyapJ1PTbb3Sv_dPycEJXUeMqFN90u0SsrcWfQ/viewform?usp=sf_link">Enter a dorkshop</a> — {/* <a href="https://airtable.com/shrZju1aTS5ancG8y">Airtable</a> — */}<a href="https://github.com/olivierbrcknr/mfadt-dorkshops">GitHub repository</a>
    </footer>
  )
}

export default Footer
