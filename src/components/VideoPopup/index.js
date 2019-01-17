import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import ModalVideo from 'react-modal-video'

import 'react-modal-video/css/modal-video.min.css'

import WatchVideoIcon from 'assets/icons/WatchVideoIcon'

import { DefaultButton, SecondaryButton } from 'components/Styled'

class VideoPopup extends React.Component {
  state = {
    isOpen: false,
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          ratio="16:9"
          isOpen={this.state.isOpen}
          videoId={this.props.id}
          onClose={() => this.setState({ isOpen: false })}
          onClick={this.openModal}
        />
        {this.props.reverse ? (
          <SecondaryButton onClick={this.openModal}>
            <WatchVideoIcon />
            <FormattedMessage id="app.button.video" />
          </SecondaryButton>
        ) : (
          <DefaultButton onClick={this.openModal}>
            <WatchVideoIcon />
            <FormattedMessage id="app.button.video" />
          </DefaultButton>
        )}
      </React.Fragment>
    )
  }
}

VideoPopup.defaultProp = {
  reverse: false,
}

VideoPopup.propTypes = {
  id: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
}

export default VideoPopup
