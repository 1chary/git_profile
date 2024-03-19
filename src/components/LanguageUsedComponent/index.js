import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

export default function LanguageUsedComponent(props) {
  const {listOfTheLanguages} = props
  return (
    <div className="pieChartContainer">
      <PieChart width={600} height={400}>
        <Pie
          data={listOfTheLanguages}
          cx={200}
          cy={200}
          labelLine={false}
          innerRadius={100}
          outerRadius="outer"
          fill="#8884d8"
          dataKey="value"
        >
          {listOfTheLanguages.map((entry, index) => (
            <Cell key="name" fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend align="right" layout="vertical" verticalAlign="middle" />
      </PieChart>
    </div>
  )
}
