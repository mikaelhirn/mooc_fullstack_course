const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
      
    </div>
  )
}

const Header = (props) => {
  return (  
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} amount={props.parts[0].exercises} />
      <Part name={props.parts[1].name} amount={props.parts[1].exercises} />
      <Part name={props.parts[2].name} amount={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.amount}</p>
  )
}

export default App