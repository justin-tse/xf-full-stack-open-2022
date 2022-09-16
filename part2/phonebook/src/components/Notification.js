import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let warningColor = message.type === 'warning' ? 'red' : 'green'
  return (
    <div className="note" style={{ color: warningColor }}>
      {message.message}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  message: PropTypes.object
}
