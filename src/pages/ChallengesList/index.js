import React, { useState } from 'react'
import colors from 'config/colors'

import ChallengesListHeader from 'components/ChallengesListHeader'
import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import { Input } from 'components/Styled'
import CampaignCard from 'components/CampaignCard'

import {
  SearchWrap,
  AutoCompleteStyled,
  SearchItem,
  SearchItemImg,
  Container,
  Block,
  Column,
  PaginationStyled,
} from './styled'
import useCampaignsList from './useCampaignsList'

function renderContent(props) {
  const { match } = props
  const subset = match.params.subset
  switch (subset) {
    case 'campaigns':
      return renderCampaigns(props)
    case 'competitions':
      return renderCompetitions(props)
    default:
      return null
  }
}

function renderCompetitions(props) {
  return <Container />
}

function renderCampaigns(props) {
  const [campaigns, page, totalPages, loading] = useCampaignsList(props)
  const [query, setQuery] = useState('')
  const { history, location } = props
  return (
    <Container>
      <SearchWrap>
        <AutoCompleteStyled
          onSelect={id => {
            history.push(`/challenges/campaigns/dashboard/${id}`)
          }}
          value={query}
          onSearch={query => setQuery(query)}
          dataSource={campaigns
            .filter(i => i.name.includes(query))
            .map(item => (
              <SearchItem key={item._id}>
                <SearchItemImg src={item.logo.src} alt={item.name} />
                {item.name}
              </SearchItem>
            ))}
        >
          <Input
            style={{ height: '46px' }}
            placeholder="Search"
            suffix={
              <Icon
                type="search"
                style={{ color: colors.darkGray, fontSize: '18px' }}
              />
            }
          />
        </AutoCompleteStyled>
      </SearchWrap>

      {loading ? (
        <Spinner />
      ) : (
        <Row gutter={{ md: 20 }} style={{ flexGrow: '1' }}>
          {campaigns.map(item => (
            <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
              <CampaignCard
                to={`/challenges/campaigns/dashboard/${item._id}`}
                name={item.name}
                picture={item.logo.src}
              />
            </Column>
          ))}
        </Row>
      )}
      {totalPages > 1 && (
        <PaginationStyled
          current={page}
          pageSize={21}
          total={totalPages}
          itemRender={(current, type, originalElement) => {
            if (type === 'page') {
              return (
                <button
                  onClick={() => {
                    history.push(`${location.pathname}?page=${current}`)
                  }}
                >
                  {originalElement}
                </button>
              )
            }
            if (type === 'prev' || type === 'next') {
              return null
            }
            return originalElement
          }}
        />
      )}
    </Container>
  )
}

export default function ChallengesList(props) {
  return (
    <Block>
      <ChallengesListHeader />
      {renderContent(props)}
    </Block>
  )
}

renderCampaigns.propTypes = {
  history: Object,
  location: Object,
}
