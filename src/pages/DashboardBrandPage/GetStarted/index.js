import React from 'react'
import { FormattedMessage } from 'react-intl'
import YoutubePlayer from 'react-youtube-player'

import {
  Container,
  Heading,
  Ocean,
  Title,
  Text,
  LinkText,
  Player,
} from './styled'

const GET_STARTED_VIDEO_ID = 'CtH6M5CXruU'
export default function GetStarted() {
  return (
    <Container>
      <Title>
        <FormattedMessage id={'getStarted'} />
      </Title>
      <Heading>
        <FormattedMessage id={'savePlanet1'} />
        <Ocean>
          <FormattedMessage id={'savePlanet2'} />
        </Ocean>
        <FormattedMessage id={'savePlanet3'} />
      </Heading>
      <Text>
        <FormattedMessage id={'fromFpToHp'} />
      </Text>

      <Player>
        <YoutubePlayer
          videoId={GET_STARTED_VIDEO_ID}
          playbackState="unstarted"
          configuration={{
            showinfo: 0,
            controls: 0,
          }}
        />
      </Player>
      <Text>
        <FormattedMessage id={'beforeGetStarted'} />
      </Text>
      <LinkText to={'/pages/our-vision'}>
        <FormattedMessage id={'app.footer.menu.howItWorks'} />
      </LinkText>
    </Container>
  )
}
