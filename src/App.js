import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Counter from './components/Counter'
import ActiveTab from './context/ActiveTab'
import Home from './components/Home'
import AccessUsername from './components/AccessUsername'
import AccessUserNameForItemDetails from './components/AccessUserNameForItemDetails'
import AccessAnalysisUsername from './components/AccessAnalysisUsername'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {activeTab: 'Home', username: ''}

  changeActiveTab = tab => {
    this.setState({activeTab: tab})
  }

  changeUserName = name => {
    this.setState({username: name})
  }

  render() {
    const {activeTab, username} = this.state
    return (
      <ActiveTab.Provider
        value={{
          activeTab,
          username,
          changeUserName: this.changeUserName,
          changeActiveTab: this.changeActiveTab,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={AccessUsername} />
          <Route exact path="/analysis" component={AccessAnalysisUsername} />
          <Route
            exact
            path="/repositories/:repoName"
            component={AccessUserNameForItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </ActiveTab.Provider>
    )
  }
}

export default App
