const Courses = ({ courses }) => {
    const courseNames = courses.map( (x) => {
      
      return (
        <div key={x.id}>
          <h2>{x.name}</h2>
          {x.parts.map( (x) => { return (<li key={x.id}>{x.name} {x.exercises}</li>)})}      
          <Total course={x} />
        </div>
      )}
    )
    
    return (
      <div>
        {courseNames}
    </div>)
  }

  const Total = ({ course }) => {
    const total = course.parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
  
    return <div><b>Total of {total} exercises</b></div>
  }

  export default Courses