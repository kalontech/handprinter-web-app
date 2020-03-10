import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import colors from 'config/colors'
import { DefaultButton, PrimaryButton } from 'components/Styled'
import { webAppBaseUrl } from 'api'
import { paySubscription } from 'api/payment'
import decodeError from 'utils/decodeError'
import media from 'utils/mediaQueryTemplate'

import { CONTACT_DATA } from 'utils/constants'

import env from 'config/env'

import { ORGANIZATION_TYPES } from './CreateOrganizationFrom/utils'

const Main = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`

const PaymentWrapper = styled.div`
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 49%;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  ${media.phone`
    padding: 20px 5px;
  `}
`

const Text = styled.span`
  font-size: 14px
  color: ${colors.dark};
`

const TextSecondary = styled(Text)`
  color: ${colors.darkGray};
`

const TextMedium = styled(TextSecondary)`
  font-size: 16px;
`

const PaymentAmount = styled.span`
  font-weight: bold;
  font-size: 37px;
  color: ${colors.dark};
  margin-bottom: -8px;
  margin-right: 3px;
`

const SummaryRow = styled.span`
  font-size: 14px;
  color: ${colors.darkGray};
  display: block;
  margin-bottom: 10px;
  text-align: center;
`

const Row = styled.div`
  flex-direction: row;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  > span {
    width: 100%;
  }
`

const PaymentTitle = styled.p`
  font-size: 28px;
  color: ${colors.dark};
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
`

const PaymentType = styled.p`
  font-size: 10px;
  color: ${colors.dark};
  font-weight: bold;
`

const SummaryTableWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Flex = styled.div`
  width: 100%;
`

const TextError = styled.p`
  color: ${colors.ocean};
  font-size: 14px;
`

class Summary extends React.Component {
  state = {
    paymentTypeAnnual: true,
    payError: undefined,
  }

  handleContinue = route => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit(route)
    }
  }

  handlePay = async () => {
    try {
      const { paymentTypeAnnual } = this.state
      const { paymentPlans } = this.props
      const period = paymentTypeAnnual ? 'annual' : 'monthly'

      const successUrl = `${webAppBaseUrl}/account/create-organization/success?organizationId=`
      const cancelUrl = `${webAppBaseUrl}/account/create-organization`

      const res = await paySubscription({
        organizationDetails: this.props.organizationDetails,
        planId: paymentPlans[period].id,
        successUrl,
        cancelUrl,
      })
      if (
        this.props.organizationDetails.type === ORGANIZATION_TYPES[1]._id &&
        res.organizationId
      ) {
        this.handleContinue(
          `/account/create-organization/success?organizationId=${
            res.organizationId
          }`,
        )
        return
      }
      // eslint-disable-next-line no-undef
      const stripe = Stripe(env.REACT_APP_STRIPE_PUB_KEY)
      if (res.session) {
        await stripe.redirectToCheckout({
          sessionId: res.session.id,
        })
      }
    } catch (error) {
      this.setState({ payError: error })
      console.error(error)
    }
  }

  handlePaymentType = isAnnual => {
    this.setState({ paymentTypeAnnual: isAnnual })
  }

  renderPaymentBlock(isAnnual, active) {
    const { intl, paymentPlans } = this.props
    const period = isAnnual ? 'annual' : 'monthly'
    const amount = paymentPlans[period].amount / 100 // in dollars
    const monthLabel = intl
      .formatMessage({ id: 'app.actions.timeValues.one.MTHS' })
      .toLowerCase()
    return (
      <PaymentWrapper
        onClick={() => this.handlePaymentType(isAnnual)}
        style={{ border: active && `1px solid ${colors.ocean}` }}
      >
        <PaymentType style={{ color: active && colors.ocean }}>
          <FormattedMessage
            id={
              isAnnual
                ? 'app.organization.annually.caps'
                : 'app.organization.monthly.caps'
            }
          />
        </PaymentType>
        <Row>
          <PaymentAmount>${amount}</PaymentAmount>
          <TextMedium>
            {isAnnual ? `$${amount / 12}/${monthLabel}` : `${monthLabel}`}
          </TextMedium>
        </Row>
      </PaymentWrapper>
    )
  }

  render() {
    if (!this.props.organizationDetails) return null

    const {
      organizationName,
      economicSector,
      annualRevenue,
      type,
    } = this.props.organizationDetails
    const freePlan = type === ORGANIZATION_TYPES[1]._id
    const { paymentTypeAnnual, payError } = this.state
    return (
      <Main>
        <Flex>
          <SummaryTableWrapper>
            <SummaryRow>
              <FormattedMessage id="app.createOrganization.organizationName" />{' '}
              <Text>{organizationName}</Text>
            </SummaryRow>
            {/* <SummaryRow>
              <FormattedMessage id="app.createOrganization.subdomain" />{' '}
              <Text>{organizationUrl}.handprinter.org</Text>
            </SummaryRow> */}
            {!!economicSector && economicSector.length > 0 && (
              <SummaryRow>
                <FormattedMessage id="app.forms.economicSector" />{' '}
                <Text>{economicSector.join(' / ')}</Text>
              </SummaryRow>
            )}
            <SummaryRow>
              <FormattedMessage id="app.forms.annualRevenue" />{' '}
              <Text>{annualRevenue}</Text>
            </SummaryRow>
          </SummaryTableWrapper>
          {!freePlan && (
            <PaymentTitle>
              <FormattedMessage id="app.createOrganization.payment" />
            </PaymentTitle>
          )}
          {!freePlan && (
            <Row>
              {this.renderPaymentBlock(false, !paymentTypeAnnual)}
              {this.renderPaymentBlock(true, paymentTypeAnnual)}
            </Row>
          )}
        </Flex>
        {payError && (
          <TextError>
            <FormattedMessage id={decodeError(payError)} />
          </TextError>
        )}
        <a href={CONTACT_DATA.EMAIL}>
          <FormattedMessage id="app.organizations.requestCustomized" />
        </a>
        <ButtonsWrapper>
          <DefaultButton
            style={{ width: '49%', minWidth: '10px' }}
            onClick={this.props.handleBack}
          >
            <FormattedMessage id="app.createOrganization.back" />
          </DefaultButton>
          <PrimaryButton
            style={{ width: '49%', minWidth: '10px' }}
            onClick={this.handlePay}
            type="primary"
          >
            {freePlan ? (
              <FormattedMessage id="app.createOrganization.create" />
            ) : (
              <FormattedMessage id="app.createOrganization.pay" />
            )}
          </PrimaryButton>
        </ButtonsWrapper>
      </Main>
    )
  }
}

Summary.propTypes = {
  handleSubmit: PropTypes.func,
  handleBack: PropTypes.func,
  organizationDetails: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  paymentPlans: PropTypes.object.isRequired,
}

export default compose(injectIntl)(Summary)
