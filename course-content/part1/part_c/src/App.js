import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })

  console.log(clicks)
  return (
    <div>
      {clicks.left}
      <button onClick={() => setClicks({ ...clicks, left: clicks.left + 1 })}>
        left
      </button>
      <button onClick={() => setClicks({ ...clicks, right: clicks.right + 1 })}>
        right
      </button>
      {clicks.right}
    </div>
  )
}

export default App;
