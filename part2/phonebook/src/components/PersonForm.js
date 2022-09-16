import PropTypes from 'prop-types'

const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, handleSubmit }) => {
  return (
    <form >
      <Input text='name' value={newName} onChange={handleNameChange} />
      <Input text='number' value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  newName: PropTypes.string,
  newNumber: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleNumberChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default PersonForm
