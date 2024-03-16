import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'
import ActiveTab from '../../context/ActiveTab'

class Header extends Component {
  state = {headerDisplay: false}

  displayMenu = () => this.setState({headerDisplay: true})

  render() {
    return (
      <ActiveTab.Consumer>
        {value => {
          const {activeTab, changeActiveTab} = value
          const {headerDisplay} = this.state

          const changeToHomeTab = () => {
            changeActiveTab('Home')
          }

          const changeToRepositoryTab = () => {
            changeActiveTab('Repositories')
          }

          const changeToAnalysisTab = () => {
            changeActiveTab('Analysis')
          }

          return (
            <div className="headerContainer">
              <Link to="/" className="navStyle">
                <h1 className="githubHeading">Github Profile Visualizer</h1>
              </Link>
              <ul className="unOrderList">
                <Link to="/" className="navStyle">
                  <li
                    className={`individualListItem ${
                      activeTab === 'Home' ? 'blueColor' : 'whiteColor'
                    }`}
                    onClick={changeToHomeTab}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/repositories" className="navStyle">
                  <li
                    className={`individualListItem ${
                      activeTab === 'Repositories' ? 'blueColor' : 'whiteColor'
                    }`}
                    onClick={changeToRepositoryTab}
                  >
                    Repositories
                  </li>
                </Link>
                <Link to="/analysis" className="navStyle">
                  <li
                    className={`individualListItem ${
                      activeTab === 'Analysis' ? 'blueColor' : 'whiteColor'
                    }`}
                    onClick={changeToAnalysisTab}
                  >
                    Analysis
                  </li>
                </Link>
              </ul>
            </div>
          )
        }}
      </ActiveTab.Consumer>
    )
  }
}

export default Header
