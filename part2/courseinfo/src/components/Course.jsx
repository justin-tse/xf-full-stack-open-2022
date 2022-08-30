const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => {
  const { name, exercises } = part

  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {

  return (
    <>
      {
        parts.map(part =>
          <Part key={part.id} part={part} />
        )
      }
    </>
  )
}

const Header = ({ course }) => <h3>{course}</h3>

const Course = ({ course }) => {
  const { name, parts } = course
  const sum = parts.map(part => part.exercises).reduce((prev, curv) => curv + prev, 0)

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course