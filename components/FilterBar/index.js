import React from 'react'

import styles from './FilterBar.module.css'

const FilterBar = (props) => {

  let classes = [styles.FilterBar]
  classes.push(props.className)


  return (
    <div className={classes.join(" ")}>

      <input placeholder="Search" onChange={e => props.onChange(e.target.value) } />

    </div>
  )
}

export default FilterBar
