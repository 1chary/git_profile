import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="pageNotFoundContainer" data-testid="pageNotFound">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1710005051/Group_7519_jjnl6q.png"
        className="pageNotFound"
        alt="page not found"
      />
      <h1 className="pageNotFoundHeading">PAGE NOT FOUND</h1>
      <p className="notFoundPara">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="goToHomeButton" type="button" onClick={goToHome}>
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
