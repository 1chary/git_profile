import ActiveTab from '../../context/ActiveTab'
import Repository from '../Repository'

const AccessUsername = () => (
  <ActiveTab.Consumer>
    {value => {
      const {username} = value
      return <Repository username={username} />
    }}
  </ActiveTab.Consumer>
)

export default AccessUsername
