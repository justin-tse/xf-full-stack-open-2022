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

const Header = ({ course }) => <h3>{course}</h3>

const Course = ({ course }) => {
  const { name, parts } = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
    </div>
  )
}

export default Course
