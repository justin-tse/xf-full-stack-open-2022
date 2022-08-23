import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [select, setSelect] = useState(anecdotes[0])

  // 1. initialCounters use array
  const initialCounters = new Array(anecdotes.length).fill(0)

  // 2. initialCounters use object
  // const initialCounters = new Map()
  // for (let i = 0; i <= anecdotes.length; i++) {
  //   initialCounters[i] = 0
  // }

  const [counters, setCounters] = useState(initialCounters)

  const selectedIndex = anecdotes.indexOf(select)

  const handleNextAnecdote = () => {
    const randomIndex = (Math.random() * (anecdotes.length - 1)).toFixed(0)
    console.log(randomIndex)
    setSelect(anecdotes[randomIndex])
    return randomIndex
  }

  const handleVote = () => {
    // 1. initialCounters use array
    const copy = [...counters]
    copy[selectedIndex]++
    setCounters(copy)

    // 2. initialCounters use object
    // setCounters({ ...counters, [selectedIndex]: counters[selectedIndex] + 1 })
  }

  const mostVote = Math.max.apply(null, counters)
  const mostVoteIdx = counters.indexOf(mostVote)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{select}</p>
      <p>has {counters[selectedIndex]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoteIdx]}</p>
      <p>has {mostVote} votes</p>
    </div>
  );
}

export default App;
