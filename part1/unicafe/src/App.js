import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Counter = ({ text, counter }) => <div>{text} {counter}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Counter text='good' counter={good} />
      <Counter text='neutral' counter={neutral} />
      <Counter text='bad' counter={bad} />
    </div>
  );
}

export default App;
