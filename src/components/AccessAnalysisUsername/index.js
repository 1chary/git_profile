import ActiveTab from '../../context/ActiveTab'
import Analysis from '../Analysis'

const AccessAnalysisUsername = () => (
  <ActiveTab.Consumer>
    {value => {
      const {username} = value

      return (
        <>
          <Analysis username={username} />
        </>
      )
    }}
  </ActiveTab.Consumer>
)

export default AccessAnalysisUsername
