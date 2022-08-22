import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, counter }) => <div>{text} {counter}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive = (good / total) * 100 || 0

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      {(!good && !neutral && !bad) ?
        <div>No feedback given</div> :
        <div>
          <Statistic text='good' counter={good} />
          <Statistic text='neutral' counter={neutral} />
          <Statistic text='bad' counter={bad} />
          <Statistic text='all' counter={total} />
          <Statistic text='average' counter={average} />
          <Statistic text='positive' counter={positive + '%'} />
        </div>
      }
    </div>
  );
}

export default App;
