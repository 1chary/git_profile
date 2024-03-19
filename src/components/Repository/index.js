import {Component} from 'react'
import {RiStarLine} from 'react-icons/ri'
import {GoRepoForked} from 'react-icons/go'
import {Link, withRouter} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import ActiveTab from '../../context/ActiveTab'
import FailureContainer from '../FailureContainer'
import LoaderComponent from '../LoaderComponent'

import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
const backgroundColors = ['pink', 'green', 'blue', 'maroon', 'yellow']

class Repository extends Component {
  state = {apiStatus: '', repoItem: []}

  componentDidMount() {
    this.renderRepoPage()
  }

  renderRepoPage = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {username} = this.props
    const repoUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=`
    try {
      const response = await fetch(repoUrl)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const convertCase = data.map(eachItem => ({
          id: eachItem.id,
          name: eachItem.name,
          avatarUrl: eachItem.owner.avatar_url,
          forksCount: eachItem.forks_count,
          stargazersCount: eachItem.stargazers_count,
          languages: eachItem.languages.map(eachLanguage => ({
            id: uuid(),
            name: eachLanguage.name,
            value: eachLanguage.value,
          })),
          login: eachItem.owner.login,
        }))
        this.setState({
          repoItem: convertCase,
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

  renderResponseList = () => {
    const {repoItem} = this.state

    return (
      <>
        <h1 className="repoHeading">Repositories</h1>

        <ul className="cardHolder">
          {repoItem.map(eachItem => (
            <Link to={`/repositories/${eachItem.name}`} className="linkElement">
              <li className="individualRepoItem" key={eachItem.id}>
                <h1 className="repoNameHeading">{eachItem.name}</h1>
                <p className="para">
                  To create a nested list using the web editor on GitHub or a
                  text editor that uses a monospaced font, like Atom,you can
                  align your list visually.
                </p>
                <ul className="languagesContainer">
                  {eachItem.languages.map(eachLanguage => (
                    <li
                      key={eachLanguage.id}
                      className={`style ${
                        backgroundColors[
                          Math.ceil(Math.random() * backgroundColors.length)
                        ]
                      }`}
                    >
                      <p className="languageName">{eachLanguage.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="starsAndForksCount">
                  <RiStarLine size={25} color="yellow" />
                  <p className="stargazersCountNumber">
                    {eachItem.stargazersCount}
                  </p>
                  <div className="forksContainer">
                    <GoRepoForked size={25} color="grey" />
                    <p className="stargazersCountNumber">
                      {eachItem.forksCount}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  renderZeroReps = () => (
    <div className="noRepsContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709723769/Layer_3_1_fjwpct.png"
        alt="no repositories"
        className="noDataImage"
      />
      <h1 className="noRepoHeading">No Repositories Found</h1>
    </div>
  )

  renderSuccess = () => {
    const {repoItem} = this.state
    return repoItem.length === 0
      ? this.renderZeroReps()
      : this.renderResponseList()
  }

  onClickTryAgain = () => this.renderRepoPage()

  renderFailure = () => (
    <FailureContainer onClickTryAgain={this.onClickTryAgain} />
  )

  renderLoading = () => <LoaderComponent />

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  goToHome = changeActiveTab => {
    changeActiveTab('Home')
  }

  emptyUsername = () => (
    <ActiveTab.Consumer>
      {value => {
        const {changeActiveTab} = value
        return (
          <div className="emptyStringContainer">
            <img
              src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709613446/Empty_Box_Illustration_1_wlrmwp.png"
              alt="empty repositories"
              className="noDataFoundImage"
            />
            <h1 className="noDataHeading">No Data Found</h1>
            <p className="gitPara">
              GitHub Username is empty, please provide a valid username for
              Repositories
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

  render() {
    return (
      <>
        <Header />
        <ActiveTab.Consumer>
          {value => {
            const {username} = value
            return (
              <div className="repositoryContainer">
                <div className="insideRepoContainer">
                  {username !== ''
                    ? this.renderAllViews()
                    : this.emptyUsername()}
                </div>
              </div>
            )
          }}
        </ActiveTab.Consumer>
      </>
    )
  }
}

export default withRouter(Repository)
