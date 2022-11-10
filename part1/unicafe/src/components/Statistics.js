import StatisticLine from './StatisticLine'

const Statistic = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const score = good - bad
  const average = score / total
  const positive = (good * 100) / total
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} percent='%' />
        </tbody>
      </table>
    </div>
  )
}

export default Statistic
