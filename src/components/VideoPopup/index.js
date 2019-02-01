import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import ModalVideo from 'react-modal-video'
import styled from 'styled-components'
import media from 'utils/mediaQueryTemplate'

import 'react-modal-video/css/modal-video.min.css'

import WatchVideoIcon from 'assets/icons/WatchVideoIcon'

import { DefaultButton, SecondaryButton } from 'components/Styled'

const Wrapper = styled.div`
  .modal-video-movie-wrap {
    width: calc(100% - 30px);
    margin: 0 auto;
  }
  .modal-video-close-btn {
    ${media.largeDesktop`
      right: 0;
  `}
    ${media.phone`
      width: 24px;
  `}
  }
`

class VideoPopup extends React.Component {
  state = {
    isOpen: false,
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <Wrapper>
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
      </Wrapper>
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
