import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

export default function LanguagesPerCommit(props) {
  const {languageCommitCountConvertedData} = props

  return (
    <PieChart width={500} height={400}>
      <Pie
        data={languageCommitCountConvertedData}
        cx={200}
        cy={200}
        labelLine={false}
        innerRadius={100}
        outerRadius="outer"
        fill="#8884d8"
        dataKey="commits"
      >
        {languageCommitCountConvertedData.map((entry, index) => (
          <Cell key="name" fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend align="right" layout="vertical" verticalAlign="middle" />
    </PieChart>
  )
}
