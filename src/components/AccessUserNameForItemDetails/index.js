import ActiveTab from '../../context/ActiveTab'
import RepositoryItemDetails from '../RepositoryItemDetails'

const AccessUserNameForItemDetails = props => (
  <ActiveTab.Consumer>
    {value => {
      const {username} = value
      const {match} = props
      const {params} = match
      const {repoName} = params
      return <RepositoryItemDetails repoName={repoName} username={username} />
    }}
  </ActiveTab.Consumer>
)

export default AccessUserNameForItemDetails
