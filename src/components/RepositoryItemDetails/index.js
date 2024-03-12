import {Component} from 'react'

import {RiStarLine} from 'react-icons/ri'
import {GoRepoForked} from 'react-icons/go'
import LoaderComponent from '../LoaderComponent'
import LanguageUsedComponent from '../LanguageUsedComponent'
import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const backgroundColors = ['pink', 'green', 'blue', 'maroon', 'yellow']

class RepositoryItemDetails extends Component {
  state = {apiStatus: '', repoDetails: []}

  componentDidMount() {
    this.renderRepoItemDetails()
  }

  renderRepoItemDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {repoName} = params
    const itemDetailsUrl = `https://apis2.ccbp.in/gpv/specific-repo/1chary/${repoName}?api_key=`
    const responseData = await fetch(itemDetailsUrl)
    if (responseData.ok === true) {
      const data = await responseData.json()
      const convertCase = {
        id: data.id,
        name: data.name,
        languages: data.lanuages.map(eachLanguage => ({
          name: eachLanguage.name,
          value: eachLanguage.value,
        })),
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        commitsCount: data.commits_count,
        issuesCount: data.open_issues_count,
        totalNumberOfContributors: data.contributors[0].contributions,
      }
      this.setState({apiStatus: apiConstants.success, repoDetails: convertCase})
    }
  }

  renderSuccessRepoItemDetails = () => {
    const {repoDetails} = this.state
    const {
      name,
      languages,
      stargazersCount,
      forksCount,
      totalNumberOfContributors,
      issuesCount,
    } = repoDetails

    return (
      <div className="insideItemDetailsContainer">
        <h1 className="check">{name}</h1>
        <p className="para">
          To create a nested list using the web editor on GitHub or a text
          editor that uses a monospaced font, like Atom,you can align your list
          visually.
        </p>
        <ul className="languagesContainer">
          {languages.map(eachLanguage => (
            <li
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
          <p className="stargazersCountNumber">{stargazersCount}</p>
          <div className="forksContainer">
            <GoRepoForked size={25} color="grey" />
            <p className="stargazersCountNumber">{forksCount}</p>
          </div>
        </div>
        <div className="issueCount">
          <h1 className="issuesCountHeading">Issues Count</h1>
          <p className="issuesValue">{issuesCount}</p>
        </div>
        <h1 className="contributorsHeading">Contributors:</h1>
        <p className="countOfTheNumbers">{totalNumberOfContributors} Members</p>
        <div className="profileContainers">
          <img
            src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710141697/Rectangle_1508_qzvx2e.png"
            alt="contributor profile"
            className="profileImage"
          />
          <img
            src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710141525/Rectangle_1509_av17dv.png"
            alt="contributor profile"
            className="profileImage"
          />
          <img
            src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710141963/Rectangle_1510_ydro3o.png"
            alt="contributor profile"
            className="profileImage"
          />
          <img
            src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710142157/Rectangle_1511_nfukrz.png"
            alt="contributor profile"
            className="profileImage"
          />
          <img
            src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710142257/Rectangle_1512_uam1ax.png"
            alt="contributor profile"
            className="profileImage"
          />
          <div className="remainingCount">
            <p className="countValue">+{totalNumberOfContributors - 5}</p>
          </div>
        </div>
        <h1 className="languagesHeading">Languages</h1>
        <LanguageUsedComponent listOfTheLanguages={languages} />
      </div>
    )
  }

  renderLoader = () => <LoaderComponent />

  allItemDetailsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessRepoItemDetails()
      case apiConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div data-testid="repoItem" className="repoItemDetailsContainer">
          {this.allItemDetailsViews()}
        </div>
      </>
    )
  }
}

export default RepositoryItemDetails
