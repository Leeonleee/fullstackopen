import { useState } from 'react'


const Button = ({ text, handleClick}) => {
  return (

    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}


const App = () =>{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const calculateAverage = () => {
    const average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
    if (isNaN(average)) {
      return 0
    } else {
      return average
    }
  }

  const calculatePositive = () => {
    const positive = (good / (good + neutral + bad)) * 100
    if (isNaN(positive)) {
      return 0
    } else {
      return positive
    }
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button text='good' handleClick={handleGoodClick}/>
        <Button text='neutral' handleClick={handleNeutralClick}/>
        <Button text='bad' handleClick={handleBadClick}/>
        <h1> statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button text='good' handleClick={handleGoodClick}/>
        <Button text='neutral' handleClick={handleNeutralClick}/>
        <Button text='bad' handleClick={handleBadClick}/>
        <h1> statistics</h1>
  
        
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine text='average' value={calculateAverage()} />
        <StatisticLine text='positive' value={calculatePositive() + '%'} />
      </div>
    )
  }

  
}

export default App
