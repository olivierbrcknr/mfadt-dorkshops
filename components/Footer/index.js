import React from 'react'
import Link from 'next/link'

import styles from './Footer.module.css'

const Footer = (props) => {

  let classes = [styles.Footer];
  classes.push(props.className);

  let dorkshopFormLink = "https://airtable.com/shrGl9Ymp2a4u1iXy" // airtable
  // dorkshopFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScBLMpVnizFyyapJ1PTbb3Sv_dPycEJXUeMqFN90u0SsrcWfQ/viewform?usp=sf_link" // google

  return (
    <footer className={classes.join(" ")}>
      MFADT &copy; 2021 — <a href={dorkshopFormLink}>Enter a dorkshop</a> — <a href="https://github.com/olivierbrcknr/mfadt-dorkshops">GitHub repository</a>
    </footer>
  )
}

export default Footer
