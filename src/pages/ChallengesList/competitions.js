import React, { useState } from 'react'
import colors from 'config/colors'

import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import { Input, DefaultButton } from 'components/Styled'
import CampaignCard from 'components/CampaignCard'

import { FormattedMessage } from 'react-intl'

import {
  SearchWrap,
  AutoCompleteStyled,
  SearchItem,
  SearchItemImg,
  Container,
  Column,
  PaginationStyled,
} from './styled'
import useCompetitionsList from './useCompetitionsList'

import { acceptInvitation } from '../../api/competitions'

function competitions(props) {
  const [competitions, page, totalPages, loading] = useCompetitionsList(props)
  const [query, setQuery] = useState('')
  const { history, location } = props
  return (
    <Container>
      <SearchWrap>
        <AutoCompleteStyled
          onSelect={id => {
            history.push(`/challenges/competitions/dashboard/${id}`)
          }}
          value={query}
          onSearch={query => setQuery(query)}
          dataSource={competitions
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
          {competitions.map(item => (
            <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
              <CampaignCard
                to={`/challenges/competitions/dashboard/${item._id}`}
                name={item.name}
                picture={item.logo.src}
                button={() =>
                  item.pendingInvitation ? (
                    <DefaultButton
                      onClick={() => {
                        acceptInvitation(item._id)
                      }}
                    >
                      <FormattedMessage id="app.competitions.invite.group.accept" />
                    </DefaultButton>
                  ) : null
                }
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

competitions.propTypes = {
  history: Object,
  location: Object,
}

export default competitions
