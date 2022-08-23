import { useState } from 'react'

const Button = ({ handleClick }) => {
  const { handleGood, handleNeutral, handleBad } = handleClick

  return (
    <div>
      <button onClick={handleGood}>{'good'}</button>
      <button onClick={handleNeutral}>{'neutral'}</button>
      <button onClick={handleBad}>{'bad'}</button>
    </div>
  )
}

const Statistic = ({ info }) => {
  const { good, neutral, bad } = info
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive + '%'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={{ handleGood, handleNeutral, handleBad }} />
      <h2>statistics</h2>
      {
        (!good && !neutral && !bad) ?
          <div>No feedback given</div> :
          <Statistic info={{ good, neutral, bad }} />
      }
    </>
  );
}

export default App;
