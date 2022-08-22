import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [value, setValue] = useState(10)

  const hello = who => () => console.log('hello', who)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do Not Define Components Within Components
  // const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text={'thousand'} />
      <Button handleClick={() => setToValue(0)} text={'reset'} />
      <Button handleClick={() => setToValue(value + 1)} text={'increment'} />
      <br />
      <Button handleClick={hello('world')} text={'button'} />
      <Button handleClick={hello('react')} text={'button'} />
      <Button handleClick={hello('function')} text={'button'} />
    </div>
  )
}

export default App