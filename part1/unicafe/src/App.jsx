import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button name="good" onHandleClick={addGood} />
      <Button name="neutral" onHandleClick={addNeutral} />
      <Button name="bad" onHandleClick={addBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <All good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {

  return <button onClick={props.onHandleClick}>{props.name}</button>
}

const Statistics = (props) => {
  return <div>good {props.good}<br />neutral {props.neutral}<br />bad {props.bad}</div>
}

const All = (props) => {
  return <div>All: {(props.good + props.neutral + props.bad)}</div>
}

const Average = (props) => {
  return <div>Average: {((props.good*1) + (props.bad*-1))/(props.good + props.neutral + props.bad)}</div>
}

const Positive = (props) => {
  return <div>Positive: {(props.good / (props.good + props.neutral + props.bad)) * 100 + "%"}</div>
}

export default App