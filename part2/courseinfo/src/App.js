const Part = ({ part }) => {
  const { name, exercises } = part

  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) =>
  <>
    {
      parts.map(part =>
        <Part key={part.id} part={part} />
      )
    }
  </>

const Header = ({ course }) => <h1>{course}</h1>

const Course = ({ course }) => {
  const { name, parts } = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App