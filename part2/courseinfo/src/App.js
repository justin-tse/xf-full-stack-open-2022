const Part = ({ part }) => {
  const { name, exercises } = part

  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  const sum = parts.reduce((prev, curv) => curv.exercises + prev, 0)

  return (
    <>
      {
        parts.map(part =>
          <Part key={part.id} part={part} />
        )
      }
      <h4>total of {sum} exercises</h4>
    </>
  )
}

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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App