const Header = ({ header }) => {
    return <h1>{header}</h1>
  }
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
const Sum = ({ parts }) => {
    // calculating the total number of exercises
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
}
  
  
const Course = ({ courses }) => {
  
    return (
        <div>
        {courses.map(course => (
            <div key={course.id}>
            <Header header={course.name} />
            <Content parts={course.parts}/>
            <Sum parts={course.parts} />
            </div>
        ))}
        </div>

    )
}

export default Course