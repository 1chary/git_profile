import {Component, React} from 'react'
import {Link} from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import LoaderComponent from '../LoaderComponent'

import Header from '../Header'

import FailureContainer from '../FailureContainer'

import ActiveTab from '../../context/ActiveTab'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

class Analysis extends Component {
  state = {
    apiStatus: '',
    analysisData: [],
    quarterCommitCount: [],
    languagePerRepo: [],
    languageCommitCount: [],
    repoCommitCount: [],
  }

  componentDidMount() {
    this.renderAnalysisData()
  }

  onClickTryAgain = () => {
    this.renderAnalysisData()
  }

  goToHome = changeActiveTab => {
    changeActiveTab('Home')
  }

  emptyUsernameAnalysis = () => (
    <ActiveTab.Consumer>
      {value => {
        const {changeActiveTab} = value
        return (
          <div className="emptyStringContainer">
            <img
              src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709613446/Empty_Box_Illustration_1_wlrmwp.png"
              alt="empty analysis"
              className="noDataFoundImage"
            />
            <h1 className="noDataHeading">No Data Found</h1>
            <p className="gitPara">
              GitHub Username is empty, please provide a valid username for
              analysis
            </p>
            <Link to="/">
              <button
                type="button"
                className="goToHomeButton"
                onClick={() => this.goToHome(changeActiveTab)}
              >
                Go to Home
              </button>
            </Link>
          </div>
        )
      }}
    </ActiveTab.Consumer>
  )

  renderAnalysisData = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {username} = this.props
    const analysisUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=`
    try {
      const response = await fetch(analysisUrl)
      if (response.ok === true) {
        const data = await response.json()
        console.log(data)
        this.setState({
          quarterCommitCount: data.quarterCommitCount,
          languagePerRepo: data.langRepoCount,
          languageCommitCount: data.langCommitCount,
          repoCommitCount: data.repoCommitCount,
          apiStatus: apiConstants.success,
        })
      } else {
        this.setState({apiStatus: apiConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderResponseAnalysis = () => {
    const {
      quarterCommitCount,
      languagePerRepo,
      languageCommitCount,
      repoCommitCount,
    } = this.state
    const convertedData = Object.entries(quarterCommitCount).map(
      ([quarter, commit]) => ({
        name: quarter,
        commits: commit,
      }),
    )
    const languagePerRepoConvertedData = Object.entries(languagePerRepo).map(
      ([nameOfLanguage, value]) => ({
        name: nameOfLanguage,
        commits: value,
      }),
    )
    const languageCommitCountConvertedData = Object.entries(
      languageCommitCount,
    ).map(([nameOfLanguage, value]) => ({
      name: nameOfLanguage,
      commits: value,
    }))
    const repoCommitCountConvertedData = Object.entries(repoCommitCount).map(
      ([nameOfLanguage, value]) => ({
        name: nameOfLanguage,
        commits: value,
      }),
    )

    return (
      <div className="analysisContainer">
        <h1 className="analysisHeading">Analysis</h1>
        <div className="lineChartContainer">
          <LineChart
            width={1140}
            height={363}
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
              type="monotype"
              dataKey="commits"
              stroke=" #3B82F6"
              activeDot={{r: 8}}
            />
          </LineChart>
        </div>
        <div className="pieChartContainer">
          <div className="languagePerRepo">
            <h1 className="repoHeading">Language Per Repos</h1>
            <ResponsiveContainer width={450} height={450}>
              <PieChart>
                <Pie
                  cx="70%"
                  cy="40%"
                  data={languagePerRepoConvertedData}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="commits"
                >
                  {languagePerRepoConvertedData.map(eachItem => (
                    <Cell
                      name={eachItem.name}
                      fill={`${
                        COLORS[Math.ceil(Math.random() * COLORS.length)]
                      }`}
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
          </div>
          <div className="languageCommitContainer">
            <h1 className="repoHeading">Language Per Commits</h1>
            <ResponsiveContainer width={450} height={450}>
              <PieChart>
                <Pie
                  cx="70%"
                  cy="40%"
                  data={languageCommitCountConvertedData}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="commits"
                >
                  {languageCommitCountConvertedData.map(eachItem => (
                    <Cell
                      name={eachItem.name}
                      fill={`${
                        COLORS[Math.ceil(Math.random() * COLORS.length)]
                      }`}
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
          </div>
        </div>
        <div className="languageCommitContainer">
          <h1 className="repoHeading">Commits Per Repo (Top 10)</h1>
          <ResponsiveContainer width={450} height={450}>
            <PieChart>
              <Pie
                cx="70%"
                cy="40%"
                data={repoCommitCountConvertedData}
                startAngle={0}
                endAngle={360}
                innerRadius="40%"
                outerRadius="70%"
                dataKey="commits"
              >
                {languageCommitCountConvertedData.map(eachItem => (
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
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  renderZeroAnalysis = () => (
    <div className="noAnalysisContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709723769/Layer_3_1_fjwpct.png"
        alt="no analysis"
        className="noDataAnalysisImage"
      />
      <h1 className="noAnalysisHeading">No Analysis Found</h1>
    </div>
  )

  renderSuccessAnalysis = () => {
    const {analysisData} = this.state
    return (
      <div>
        {analysisData === 0
          ? this.renderZeroAnalysis()
          : this.renderResponseAnalysis()}
      </div>
    )
  }

  renderFailureAnalysis = () => (
    <FailureContainer onClickTryAgain={this.onClickTryAgain} />
  )

  renderLoadingAnalysis = () => <LoaderComponent />

  renderAllAnalysisViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessAnalysis()
      case apiConstants.failure:
        return this.renderFailureAnalysis()
      case apiConstants.loading:
        return this.renderLoadingAnalysis()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ActiveTab.Consumer>
          {value => {
            const {username} = value
            return (
              <div className="repositoryContainer" data-testid="analysis">
                <div className="insideAnalysisContainer">
                  {username !== ''
                    ? this.renderAllAnalysisViews()
                    : this.emptyUsernameAnalysis()}
                </div>
              </div>
            )
          }}
        </ActiveTab.Consumer>
      </>
    )
  }
}

export default Analysis
