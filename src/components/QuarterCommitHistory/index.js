import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import './index.css'

export default function LinearChart(props) {
  const {convertedData} = props
  return (
    <div className="lineChartContainer">
      <LineChart
        width={1140}
        height={343}
        data={convertedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="commits"
          stroke="#8884d8"
          activeDot={{r: 8}}
        />
      </LineChart>
    </div>
  )
}
