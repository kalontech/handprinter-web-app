import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import colors from 'config/colors'
import { DefaultButton, PrimaryButton } from 'components/Styled'
import { webAppBaseUrl } from 'api'
import { paySubscription } from 'api/payment'
import decodeError from 'utils/decodeError'
import media from 'utils/mediaQueryTemplate'

import { CONTACT_DATA } from 'utils/constants'

import { MOUNTHLY_SUBSCRIPTION_AMOUNT } from './CreateOrganizationFrom/utils'

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

const YEAR = 12
class Summary extends React.Component {
  state = {
    paymentTypeAnnual: true,
    payAmount: undefined,
    payError: undefined,
  }

  componentDidMount() {
    if (this.props.organizationDetails) {
      const { type, annualRevenue } = this.props.organizationDetails
      const payAmountPerMonth = this.calculateAmountPM(type, annualRevenue)
      const paidAnnualy = payAmountPerMonth * 0.9 * YEAR // 10% discount
      this.setState({ payAmount: paidAnnualy })
    }
  }

  handleContinue = () => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit()
    }
  }

  handlePay = async () => {
    try {
      const { payAmount, paymentTypeAnnual } = this.state
      const organizationName = this.props.organizationDetails.organizationName
      const successUrl = `${webAppBaseUrl}/account/create-organization/success?organization=${organizationName}`
      const cancelUrl = `${webAppBaseUrl}/account/create-organization`

      const res = await paySubscription({
        amount: payAmount * 100, // in cents
        isAnnual: paymentTypeAnnual,
        successUrl,
        cancelUrl,
        organizationDetails: this.props.organizationDetails,
      })
      // eslint-disable-next-line no-undef
      const stripe = Stripe(process.env.REACT_APP_STRIPE_PUB_KEY)
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

  calculateAmountPM = (type, annualRevenue) => {
    return MOUNTHLY_SUBSCRIPTION_AMOUNT[type][annualRevenue] || ''
  }

  handlePaymentType = (isAnnual, amount) => {
    this.setState({ paymentTypeAnnual: isAnnual, payAmount: amount })
  }

  renderPaymentBlock(amount, isAnnual, active) {
    const { intl } = this.props
    const monthLabel = intl
      .formatMessage({ id: 'app.actions.timeValues.one.MTHS' })
      .toLowerCase()
    return (
      <PaymentWrapper
        onClick={() => this.handlePaymentType(isAnnual, amount)}
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
      type,
      annualRevenue,
    } = this.props.organizationDetails

    const { paymentTypeAnnual, payError } = this.state
    const payAmountPerMonth = this.calculateAmountPM(type, annualRevenue)
    const paidAnnualy = payAmountPerMonth * 0.9 * YEAR // 10% discount
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
          <PaymentTitle>
            <FormattedMessage id="app.createOrganization.payment" />
          </PaymentTitle>
          <Row>
            {this.renderPaymentBlock(
              payAmountPerMonth,
              false,
              !paymentTypeAnnual,
            )}
            {this.renderPaymentBlock(paidAnnualy, true, paymentTypeAnnual)}
          </Row>
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
            <FormattedMessage id="app.createOrganization.pay" />
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
}

export default compose(injectIntl)(Summary)
