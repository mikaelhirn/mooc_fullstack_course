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
    </div>
  )
}

const Button = (props) => {

  return <button onClick={props.onHandleClick}>{props.name}</button>
}

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0){
    return <div>No feedback given</div>
  }
  return (
    <div>
      <table>
      <tr>
        <td>good</td><td>{props.good}</td>
      </tr>
      <tr>
        <td>neutral</td><td>{props.neutral}</td>
      </tr>
      <tr>
        <td>bad</td><td>{props.bad}</td>
      </tr>
      <tr>
        <td>all</td><td><All good={props.good} neutral={props.neutral} bad={props.bad} /></td>
      </tr>
      <tr>
        <td>average</td><td><Average good={props.good} neutral={props.neutral} bad={props.bad} /></td>
      </tr>
      <tr>
        <td>positive</td><td><Positive good={props.good} neutral={props.neutral} bad={props.bad} /></td>
      </tr>
      </table>
    </div>)
}

const All = (props) => {
  return (props.good + props.neutral + props.bad)
}

const Average = (props) => {
  return ((props.good*1) + (props.bad*-1))/(props.good + props.neutral + props.bad)
}

const Positive = (props) => {
  return (props.good / (props.good + props.neutral + props.bad)) * 100 + "%"
}

export default App