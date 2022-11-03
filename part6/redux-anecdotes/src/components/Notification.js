import { connect/*, useSelector*/ } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'blue'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
return {
  notification: state.notification
}
}

export default connect( 
  mapStateToProps,
)(Notification)