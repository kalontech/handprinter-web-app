import React, { useState } from 'react'
import colors from 'config/colors'

import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import { Input } from 'components/Styled'
import CampaignCard from 'components/CompetitionCard'

import {
  SearchWrap,
  AutoCompleteStyled,
  SearchItem,
  SearchItemImg,
  Container,
  Column,
  PaginationStyled,
} from './styled'
import useCampaignsList from './useCampaignsList'

function campaigns(props) {
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

campaigns.propTypes = {
  history: Object,
  location: Object,
}

export default campaigns
