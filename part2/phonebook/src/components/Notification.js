const Notification = ({ message, warningColor }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="note" style={{ color: warningColor }}>
      {message}
    </div>
  )
}

export default Notification