import './index.css'

const FailureContainer = props => {
  const {onClickTryAgain} = props

  const tryAgain = () => {
    onClickTryAgain()
  }

  return (
    <div className="failureContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709307868/Group_7522_e6aek6.png"
        alt="failure view"
        className="failureCatImage"
      />
      <p className="failureHeading">Something went wrong. Please try again</p>
      <button type="button" className="retryButton" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureContainer
