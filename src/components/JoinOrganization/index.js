import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import notification from 'antd/lib/notification'
import { intlShape, injectIntl } from 'react-intl'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

import { Form, Button } from 'antd'
import { Input, FormItem } from 'components/Styled'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'

import { joinOrganization } from '../../api/organization'

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 58px;
  background-color: ${colors.white};
  min-width: 592px;

  ${media.phone`
    min-width: initial; 
    width: 100%; 
    min-height: 100%; 
  `}
`

const Title = styled.h3`
  line-height: 35px;
  font-size: 28px;
  text-align: center;
  color: ${colors.dark};
  margin-bottom: 32px;
`

class JoinOrganization extends Component {
  static displayName = 'JoinOrganization'

  state = {
    loading: false,
  }

  static propTypes = {
    intl: intlShape.isRequired,
    form: Object,
  }

  onSubmit = async e => {
    e.preventDefault()
    const {
      intl,
      form: { validateFields },
    } = this.props

    validateFields(async (err, values) => {
      if (!err) {
        const { organizationInviteCode } = values
        try {
          this.setState({ loading: true })
          await joinOrganization({
            organizationInviteCode,
          })
          notification.success({
            message: intl.formatMessage({ id: 'app.pages.groups.success' }),
            description: 'Organization joined, reloading!',
          })
          setTimeout(() => window.location.reload(), 1000)
        } catch (error) {
          notification.error({
            message: 'Error',
            description: error.message,
          })
          console.log(err)
        } finally {
          this.setState({ loading: false })
        }
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl,
    } = this.props
    return (
      <Block>
        <Title>Please enter organization invitation code</Title>
        <Form onSubmit={this.onSubmit}>
          <FormItem>
            {getFieldDecorator('organizationInviteCode')(
              <Input
                style={{
                  width: 500,
                }}
                type="text"
                placeholder={intl.formatMessage({
                  id: 'app.forms.organizationCode',
                })}
                suffix={
                  <InfoElement
                    type={INFO_ELEMENT_TYPES.INFO}
                    tooltipProps={{
                      title: intl.formatMessage({
                        id: 'app.forms.organizationCodeHint',
                      }),
                    }}
                  />
                }
              />,
            )}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={this.state.loading}
          >
            Join
          </Button>
        </Form>
      </Block>
    )
  }
}

export default compose(
  Form.create(),
  injectIntl,
)(JoinOrganization)
