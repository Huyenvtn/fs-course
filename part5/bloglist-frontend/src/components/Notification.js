import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'

const Notification = ({ message, classes }) => {
  return <div className={classes}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired
}
export default Notification
