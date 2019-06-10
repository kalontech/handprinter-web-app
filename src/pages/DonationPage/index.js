import React, { Fragment, Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, Checkbox, Radio } from 'antd'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { required } from 'config/validationRules'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import PageMetadata from 'components/PageMetadata'
import Spinner from 'components/Spinner'
import {
  BlockContainer,
  BlockTitle,
  BlockSubTitle,
  TextMedium,
  Input,
  FormItem as FormItemDefault,
  PrimaryButton,
} from 'components/Styled'

import heroImg from 'assets/donation/hero.png'
import fingerPrintleft from 'assets/donation/fingerprint_left.png'
import fingerPrintRight from 'assets/donation/fingerprint_right.png'
import donorsImg from 'assets/donation/global_stat_finger.png'
import { donate, getSponsors } from 'api/payment'
import { webAppBaseUrl } from 'api'

const Hero = styled.section`
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("${fingerPrintleft}") no-repeat left top, ${
  colors.ocean
} url("${fingerPrintRight}") no-repeat right bottom;
  ${media.tablet`
    background: url("${fingerPrintleft}") no-repeat left top, ${
    colors.ocean
  } url("${fingerPrintRight}") no-repeat right -30px bottom -30px;
  `};
  ${media.phone`
    margin-top: 20px;
    background: url("${fingerPrintleft}") no-repeat left -35px top -60px, ${
    colors.ocean
  } url("${fingerPrintRight}") no-repeat right -120px bottom -45px;
  `};
  
`

const HeroTitle = styled(BlockTitle)`
  margin-top: -40px;
  margin-bottom: 0;
  color: ${colors.white};
  ${media.tablet`
    font-size: 48px;
  `};
  ${media.phone`
    font-size: 25px;
    margin-top: -30px;
  `};
`

const Centered = styled(Col)`
  margin-top: -10px;
  text-align: center;
  ${media.phone`
    margin-top: 0;
  `};
`

const DonorsList = styled.section`
  background: ${colors.lightGray} url(${donorsImg}) no-repeat right top 80px;
  ${media.tablet`
    background: ${colors.lightGray};
  `};
  ${media.phone`
    background: ${colors.white};
  `};
`
const List = styled.div`
  max-width: 578px;
  margin: -166px auto 100px;
  padding: 65px 60px 50px;
  background: ${colors.white};
  box-shadow: 0px 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  ${media.tablet`
    padding: 65px 70px 50px;
    max-width: 100%;
    margin-top: -177px;
  `};
  ${media.phone`
    margin: 0 auto;
    box-shadow: none;
    padding: 65px 0;
  `};
`

const DonorsListHeader = styled.div`
  text-align: center;
  max-width: 435px;
  margin: 0 auto 23px;
  ${media.phone`
    ${BlockSubTitle} {
      margin-bottom: 20px;
    }
    ${TextMedium} {
      font-size: 16px;
    }
  `};
`

const DonorsListItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray};
  padding: 26px 20px 12px 10px;
  &:last-child {
    border-bottom: none;
  }
  ${media.tablet`
    padding-left: 20px;
  `};
  ${media.phone`
    padding: 15px 0 12px 0;
  `};
`

const DonorsListInfo = styled.div`
  display: flex;
  align-items: baseline;
  ${media.tablet`
    flex-direction: column;
  `};
`

const Amount = styled.div`
  font-size: 22px;
  line-height: 30px;
  text-align: right;
  ${media.phone`
    font-size: 16px;
    line-height: 28px;
    font-weight: bold;
  `};
`

const Name = styled.div`
  margin-right: 8px;
  font-size: 22px;
  line-height: 30px;
  color: ${colors.green};
  ${media.phone`
    font-size: 16px;
    line-height: 28px;
  `};
`

const DonateSection = styled.section`
  padding: 100px 0 266px;
  ${media.tablet`
    padding-bottom: 276px;
  `};
  ${media.phone`
    padding: 0;
  `};
`

const Donate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.tablet`
    flex-direction: column;
  `};
`

const DonateSubtitle = styled.div`
  font-size: 22px;
  line-height: 30px;
  ${media.phone`
    font-size: 16px;
    line-height: 28px;
    font-weight: bold;
    letter-spacing: 1px;
  `};
`

const StyledDonateSubtitle = styled(DonateSubtitle)`
  ${media.phone`
    text-align: center;
    margin-top: 24px;
  `};
`

const DonateInfo = styled.div`
  max-width: 630px;
  position: relative;
  z-index: 1;
  padding: 40px 50px 60px;
  background: ${colors.white};
  box-shadow: 0px 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  ${BlockSubTitle} {
    margin-bottom: 30px;
    text-align: center;
  }
  ${media.tablet`
    padding: 40px 55px 60px;
    max-width: 560px;
  `};
  ${media.phone`
    max-width: 100%;
    box-shadow: none;
    padding: 60px 0 40px;
    ${BlockSubTitle} {
      margin-bottom: 15px;
    }
    ${DonateSubtitle} {
      letter-spacing: 1px;
    }
  `};
`

const DonateForm = styled(Form)`
  width: 100%;
  max-width: 450px;
  padding: 40px 45px;
  background: ${colors.ocean};
  color: ${colors.white};
  border-radius: 0px 4px 4px 0px;
  ${DonateSubtitle} {
    margin-bottom: 18px;
  }
  ${media.tablet`
    max-width: 520px;
    padding: 60px 80px;
    border-radius: 0px 4px 4px 0px;
  `};
  ${media.phone`
    width: calc(100% + 30px);
    margin-left: -15px;
    margin-right: -15px;
    border-radius: 0;
    padding: 50px 15px;
  `};
`

const DonateList = styled.div`
  margin: 30px 0;
  ${media.phone`
    margin: 15px 0;
  `};
`

const DonateListItem = styled(TextMedium)`
  position: relative;
  padding-left: 37px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  &:before {
    position: absolute;
    left: 15px;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.ocean};
    content: '';
  }
  ${media.tablet`
    padding-left: 24px;
    &:before {
      left: 0;
    }
  `};
  ${media.phone`
    font-size: 16px;
  `};
`

const DonateText = styled(TextMedium)`
  font-weight: bold;
  letter-spacing: 0.5px;
  color: ${colors.ocean};
  ${media.phone`
    font-size: 16px;
  `};
`

const FormItem = styled(FormItemDefault)`
  margin: 0 0 18px;
  .ant-form-item-control {
    line-height: 1;
  }
  ${media.phone`
    margin-bottom: 12px;
  `};
`

const RadioButtons = styled.div`
  .ant-radio-group {
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    ${media.phone`
      margin-bottom: 12px;
    `};
    @media (max-width: 320px) {
      flex-wrap: wrap;
    }
  }
`

const RadioInput = styled.input`
  width: 100%;
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  background: ${colors.white};
  border: none;
  outline: none;
  text-align: center;
  cursor: text;
  color: ${colors.ocean};
  font-weight: bold;
`

const RadioButton = styled(Radio)`
  position: relative;
  width: 72px;
  margin: 0;
  line-height: 45px;
  text-align: center;
  font-weight: bold;
  border-left: 1px solid ${colors.gray};
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  color: ${colors.white};
  overflow: hidden;
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-right: 1px solid ${colors.gray};
    border-radius: 0 4px 4px 0;
  }
  &.ant-radio-wrapper-checked {
    background: ${colors.white};
    color: ${colors.ocean};
  }
  .ant-radio {
    display: none;
  }
  @media (max-width: 320px) {
    flex-shrink: 0;
    &:first-child {
      border-radius: 4px 0 0 0;
    }
    &:last-child {
      border-top: none;
      border-radius: 0 0 4px 4px;
    }
    &:nth-child(4) {
      border-right: 1px solid ${colors.gray};
      border-radius: 0 4px 4px 0;
    }
  }
`

const FormButton = styled.div`
  text-align: center;
  margin-top: 25px;
  ${PrimaryButton} {
    width: 100%;
  }
`

const StyledCheckbox = styled(Checkbox)`
  color: ${colors.white};
  padding-left: 26px;
  .ant-checkbox {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid ${colors.gray};
    background: ${colors.white};
    border-radius: 4px;
    height: 18px;
    width: 18px;
    overflow: hidden;
    & + span {
      padding: 0;
      line-height: 20px;
    }
  }
  .ant-checkbox-checked::after {
    border: none;
  }
  .ant-checkbox-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 4px;
    &::after {
      display: none;
    }
    .ant-checkbox-checked & {
      background: ${colors.green};
    }
  }
`

const Loader = styled.li`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const RADIO_CHOICE = {
  first: '10',
  second: '50',
  third: '100',
  fourth: '1000',
  other: 'other',
}

class DonationPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    radioChoice: RADIO_CHOICE.first,
    inputValue: RADIO_CHOICE.other,
    isEditable: false,
    sponsors: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchSponsors()
  }

  async fetchSponsors() {
    try {
      const res = await getSponsors()
      this.setState({ sponsors: res.sponsors, loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
    }
  }

  handleRadioChange = e => {
    this.setState({ radioChoice: e.target.value })
    if (e.target.id === 'editable') {
      this.setState({ isEditable: true })
    } else {
      this.setState({ isEditable: false })
    }
  }

  onInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  pay = async values => {
    try {
      const { radioChoice, inputValue } = this.state
      const redirectUrl = `${webAppBaseUrl}/pages/donations`
      const amount =
        (radioChoice === RADIO_CHOICE.other ? inputValue : radioChoice) * 100 // in cents

      const res = await donate({
        amount,
        redirectUrl,
        name: values.name,
        anonymous: values.anonymous,
        showAmount: values.amount,
      })
      // eslint-disable-next-line no-undef
      const stripe = Stripe(process.env.REACT_APP_STRIPE_PUB_KEY)
      if (res.session) {
        await stripe.redirectToCheckout({
          sessionId: res.session.id,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleSubmit = e => {
    const { form } = this.props
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        this.pay(values)
        console.log(values)
      }
    })
  }

  render() {
    const { form, intl } = this.props
    const { isEditable, inputValue, sponsors, loading } = this.state
    return (
      <Fragment>
        <PageMetadata pageName="donationPage" />
        <Hero>
          <BlockContainer>
            <Row type="flex" justify="center">
              <Centered xs={22} lg={17}>
                <Centered>
                  <img src={heroImg} alt="" />
                  <HeroTitle>
                    <FormattedMessage id="app.donationPage.hero.title" />
                  </HeroTitle>
                </Centered>
              </Centered>
            </Row>
          </BlockContainer>
        </Hero>
        <DonateSection>
          <BlockContainer>
            <Donate>
              <DonateInfo>
                <BlockSubTitle>
                  <FormattedMessage id="app.donationPage.donateInfo.title" />
                </BlockSubTitle>
                <DonateSubtitle>
                  <FormattedMessage id="app.donationPage.donateInfo.subtitle" />
                </DonateSubtitle>
                <DonateList>
                  <DonateListItem>
                    <FormattedMessage id="app.donationPage.donateInfo.listItem1" />
                  </DonateListItem>
                  <DonateListItem>
                    <FormattedMessage id="app.donationPage.donateInfo.listItem2" />
                  </DonateListItem>
                  <DonateListItem>
                    <FormattedMessage id="app.donationPage.donateInfo.listItem3" />
                  </DonateListItem>
                  <DonateListItem>
                    <FormattedMessage id="app.donationPage.donateInfo.listItem4" />
                  </DonateListItem>
                </DonateList>
                <DonateText>
                  <FormattedMessage id="app.donationPage.donateInfo.text" />
                </DonateText>
              </DonateInfo>
              <DonateForm onSubmit={this.handleSubmit}>
                <DonateSubtitle>
                  <FormattedMessage id="app.donationPage.form.text1" />
                </DonateSubtitle>
                <FormItem>
                  {form.getFieldDecorator('name', {
                    rules: [
                      required(
                        intl.formatMessage({ id: 'app.errors.isRequired' }),
                      ),
                    ],
                  })(
                    <Input
                      type="text"
                      placeholder={intl.formatMessage({
                        id: 'app.donationPage.form.name',
                      })}
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {form.getFieldDecorator('anonymous', {
                    valuePropName: 'checked',
                    initialValue: false,
                    rules: [
                      required(
                        intl.formatMessage({ id: 'app.errors.isRequired' }),
                      ),
                    ],
                  })(
                    <StyledCheckbox>
                      {intl.formatMessage({
                        id: 'app.donationPage.form.anonymousCheckbox',
                      })}
                    </StyledCheckbox>,
                  )}
                </FormItem>
                <StyledDonateSubtitle>
                  <FormattedMessage id="app.donationPage.form.text2" />
                </StyledDonateSubtitle>
                <FormItem>
                  <RadioButtons>
                    <Radio.Group
                      onChange={this.handleRadioChange}
                      defaultValue={RADIO_CHOICE.first}
                    >
                      <RadioButton value={RADIO_CHOICE.first}>
                        {intl.formatMessage({
                          id: 'app.donationPage.form.radio.first',
                        })}
                      </RadioButton>
                      <RadioButton value={RADIO_CHOICE.second}>
                        {intl.formatMessage({
                          id: 'app.donationPage.form.radio.second',
                        })}
                      </RadioButton>
                      <RadioButton value={RADIO_CHOICE.third}>
                        {intl.formatMessage({
                          id: 'app.donationPage.form.radio.third',
                        })}
                      </RadioButton>
                      <RadioButton value={RADIO_CHOICE.fourth}>
                        {intl.formatMessage({
                          id: 'app.donationPage.form.radio.fourth',
                        })}
                      </RadioButton>
                      <RadioButton value={inputValue} id="editable">
                        {inputValue === RADIO_CHOICE.other ? (
                          <>
                            {intl.formatMessage({
                              id: 'app.donationPage.form.radio.other',
                            })}
                          </>
                        ) : (
                          <>{inputValue}</>
                        )}
                        {isEditable && (
                          <RadioInput
                            type="text"
                            autoFocus
                            onChange={this.onInputChange}
                          />
                        )}
                      </RadioButton>
                    </Radio.Group>
                  </RadioButtons>
                </FormItem>
                <FormItem>
                  {form.getFieldDecorator('amount', {
                    valuePropName: 'checked',
                    initialValue: true,
                    rules: [
                      required(
                        intl.formatMessage({ id: 'app.errors.isRequired' }),
                      ),
                    ],
                  })(
                    <StyledCheckbox>
                      {intl.formatMessage({
                        id: 'app.donationPage.form.amountCheckbox',
                      })}
                    </StyledCheckbox>,
                  )}
                </FormItem>
                <FormButton>
                  <PrimaryButton htmlType="submit" type="primary">
                    <FormattedMessage id="app.donationPage.form.submit" />
                  </PrimaryButton>
                </FormButton>
              </DonateForm>
            </Donate>
          </BlockContainer>
        </DonateSection>
        <DonorsList>
          <BlockContainer>
            <List>
              <DonorsListHeader>
                <BlockSubTitle>
                  <FormattedMessage id="app.donationPage.donors.title" />
                </BlockSubTitle>
                <TextMedium>
                  <FormattedMessage id="app.donationPage.donors.description" />
                </TextMedium>
              </DonorsListHeader>
              {loading && (
                <Loader>
                  <Spinner />
                </Loader>
              )}
              <div>
                {sponsors.map((sponsor, index) => (
                  <DonorsListItem key={index}>
                    <DonorsListInfo>
                      <Name>
                        {sponsor.anonymous ? (
                          <FormattedMessage id="app.donation.anonymous" />
                        ) : (
                          sponsor.name
                        )}
                      </Name>
                    </DonorsListInfo>
                    {sponsor.showAmount && (
                      <Amount>${sponsor.amount / 100}</Amount>
                    )}
                  </DonorsListItem>
                ))}
              </div>
            </List>
          </BlockContainer>
        </DonorsList>
      </Fragment>
    )
  }
}

export default compose(
  Form.create(),
  injectIntl,
)(DonationPage)
