import React, { Component, Fragment } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

import { BlockContainer, Pagination } from './../../components/Styled'
import ActionCard from './../../components/ActionCard'
import api from './../../api'
import Spinner from './../../components/Spinner'

const InnerContainer = styled.div`
  margin: 25px 0 35px;
`

class ActionsPage extends Component {
  state = {
    actions: [],
    limit: 0,
    loading: false,
    page: 0,
    total: 0,
  }

  componentDidMount = async () => {
    const search = get(this.props, 'location.search', {})
    await this.fetchActions(queryString.parse(search))
  }

  fetchActions = async (query = {}) => {
    if (query.page && query.page === this.state.page.toString()) {
      return
    }
    this.setState({ loading: true }, () => {
      window.scrollTo(0, 0)
    })
    const {
      actions: { docs: actions, limit, totalDocs: total, page },
    } = await api.getActions(query)
    this.setState({ actions, limit, loading: false, page, total })
  }

  componentDidUpdate = async prevProps => {
    const prevSearch = get(prevProps, 'location.search')
    const currSearch = get(this.props, 'location.search')
    if (!isEmpty(currSearch) && prevSearch !== currSearch) {
      const query = queryString.parse(currSearch)
      await this.fetchActions(query)
    }
  }

  paginationItemRender(current, type, originalElement) {
    if (type === 'page') {
      return <Link to={`/actions?page=${current}`}>{originalElement}</Link>
    }
    if (type === 'prev' || type === 'next') {
      return null
    }
    return originalElement
  }

  render() {
    const { actions, limit, loading, page, total } = this.state
    return (
      <Fragment>
        <BlockContainer>
          {loading ? (
            <Spinner />
          ) : (
            <InnerContainer>
              <Row>
                {actions.map(action => (
                  <Col key={action._id} span={8}>
                    <ActionCard
                      linkPrefix="/actions"
                      slug={action.slug}
                      picture={action.picture}
                      name={action.name}
                      impacts={action.impacts}
                    />
                  </Col>
                ))}
              </Row>
              <Pagination
                current={page}
                itemRender={this.paginationItemRender}
                pageSize={limit}
                total={total}
              />
            </InnerContainer>
          )}
        </BlockContainer>
      </Fragment>
    )
  }
}

export default ActionsPage
