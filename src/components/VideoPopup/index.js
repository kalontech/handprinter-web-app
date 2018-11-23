import React from 'react'
import PropTypes from 'prop-types'
import ModalVideo from 'react-modal-video'
import WatchVideoIcon from '../../assets/icons/WatchVideoIcon'
import { FormattedMessage } from 'react-intl'
import { DefaultButton } from './../Styled'
import '../../../node_modules/react-modal-video/css/modal-video.min.css'

class VideoPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <div>
        <ModalVideo
          channel="youtube"
          ratio="16:9"
          isOpen={this.state.isOpen}
          videoId={this.props.id}
          onClose={() => this.setState({ isOpen: false })}
        />
        <DefaultButton onClick={this.openModal}>
          <WatchVideoIcon />
          <FormattedMessage id="app.button.video" />
        </DefaultButton>
      </div>
    )
  }
}

VideoPopup.propTypes = {
  id: PropTypes.string.isRequired,
}

export default VideoPopup
