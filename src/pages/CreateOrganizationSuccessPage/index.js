import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

import { OceanContainer, OceanModal, DefaultButton } from 'components/Styled'
import { Creators as AccountCreators } from 'redux/accountStore'
import organiztionCreationSuccess from 'assets/icons/organiztionCreationSuccess.png'
import * as apiUsers from 'api/user'
import queryString from 'query-string'
import { addAdmins } from 'api/organization'

import SearchableInput from '../../components/SearchableInput'

const Modal = styled(OceanModal)`
  width: 632px;
  justify-content: space-between;
  background-color: ${colors.lightGray};
  padding: 0px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.white};
  padding: 50px 31px 0px 70px;
  flex-direction: row;

  ${media.phone`
    flex-direction: column;
    padding: 10px;
  `}
`

const HeaderTitleText = styled.p`
  font-size: 28px;
  color: ${colors.dark};
`

const HeaderText = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
`

const InviteTitleText = styled.p`
  font-size: 19px;
  color: ${colors.dark};
`

const InviteText = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
  margin-top: 9px;
  margin-bottom: 20px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 70px;

  ${media.phone`
    padding: 10px;
  `}
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;

  ${media.phone`
    flex-direction: column;
  `}
`

const DefaultButtonWrapper = styled(DefaultButton)`
  width: 49%;

  ${media.phone`
    width: 100%;
    margin-bottom: 10px;
  `}
`
const ButtonWrapper = styled(Button)`
  width: 49%;

  ${media.phone`
    width: 100%
  `}
`

class CreateOrganizationSuccessPage extends React.PureComponent {
  state = {
    query: '',
    admins: [],
    suggestions: [],
  }

  handleSend = async () => {
    try {
      await addAdmins({ admins: this.state.admins })
      this.props.history.push('/pages/our-vision')
    } catch (error) {
      console.error(error)
    }
  }

  handleSkip = () => {
    this.props.history.push('/pages/our-vision')
  }

  searchByUser = async query => {
    try {
      const matchedUsers = await apiUsers.search(query)
      this.setState({
        suggestions: matchedUsers.users,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleSearch = query => {
    this.searchByUser(query)
  }

  handleAdminsChange = admins => {
    this.setState({ admins })
  }

  render() {
    const {
      intl: { formatMessage },
      location: { search },
    } = this.props
    const organizationName = queryString.parse(search).organization
    const { query, suggestions, admins } = this.state
    return (
      <Fragment>
        <OceanContainer>
          <Modal>
            <Header>
              <div>
                <HeaderText>
                  <FormattedMessage id="app.createOrganizationSuccessPage.title" />
                </HeaderText>
                <HeaderTitleText>{organizationName}</HeaderTitleText>
              </div>
              <img src={organiztionCreationSuccess} />
            </Header>

            <Content>
              <InviteTitleText>
                <FormattedMessage id={'app.createOrganization.inviteAdmins'} />
              </InviteTitleText>
              <InviteText>
                <FormattedMessage
                  id={'app.createOrganization.inviteAdminsText'}
                />
              </InviteText>

              <SearchableInput
                values={admins}
                onValuesChange={this.handleAdminsChange}
                suggestions={suggestions}
                query={query}
                onSearch={this.handleSearch}
                placeholder={
                  admins.length === 0
                    ? formatMessage({
                        id: 'app.createOrganization.inviteAdminsSearch',
                      })
                    : ''
                }
              />

              <Row>
                <DefaultButtonWrapper onClick={this.handleSkip} type="primary">
                  <FormattedMessage id="app.pages.groups.skipForNow" />
                </DefaultButtonWrapper>
                <ButtonWrapper onClick={this.handleSend} type="primary">
                  <FormattedMessage id="app.resetPasswordPage.send" />
                </ButtonWrapper>
              </Row>
            </Content>
          </Modal>
        </OceanContainer>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  resetPasswordError: state.account.resetPasswordError,
  resettingPassword: state.account.resettingPassword,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPasswordRequest: email =>
        AccountCreators.resetPasswordRequest(email),
    },
    dispatch,
  )

CreateOrganizationSuccessPage.propTypes = {
  history: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Form.create(),
  injectIntl,
)(CreateOrganizationSuccessPage)
