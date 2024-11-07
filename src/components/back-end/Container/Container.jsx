import React from 'react'
import {Header} from '../index'
import Styles from './Container.module.css'
function Container({children}) {
  return (
    <div className={Styles.wrapper}>
    <Header />
    <div className={Styles.spacing}>
    {children}
    </div>
    </div>
  )
}

export default Container