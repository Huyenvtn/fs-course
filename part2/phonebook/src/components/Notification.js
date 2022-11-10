import React from 'react'
import '../index.css'

const Notification = ({ message, classes }) => {
  return <div className={classes}>{message}</div>
}

export default Notification
