import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

const LanguageUsedComponent = props => {
  const {listOfTheLanguages} = props
  return (
    <ResponsiveContainer width="100%" height={370}>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={listOfTheLanguages}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="value"
        >
          {listOfTheLanguages.map(eachItem => (
            <Cell
              name={eachItem.name}
              fill={`${COLORS[Math.ceil(Math.random() * COLORS.length)]}`}
            />
          ))}
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          className="legendStyling"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default LanguageUsedComponent
