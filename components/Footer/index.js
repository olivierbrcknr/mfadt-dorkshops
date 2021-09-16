import React from 'react'
import Link from 'next/link'

import styles from './Footer.module.css';

const Footer = (props) => {

  let classes = [styles.Footer];
  classes.push(props.className);

  return (
    <footer className={classes.join(" ")}>
      MFADT &copy; 2021
    </footer>
  )
}

export default Footer
