import React from 'react'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import { Select, Modal } from 'antd'
import PropTypes from 'prop-types'

import colors from 'config/colors'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import media from 'utils/mediaQueryTemplate'

import { METRICS } from '../../utils/constants'

import { Input, PrimaryButton } from '../Styled'

const natureLink = 'https://www.nature.org/en-us/'
const natureLabel = 'nature.org'
const coolclimateLink = 'https://coolclimate.org/'
const coolclimateLabel = 'coolclimate.berkeley.edu'

const Paragraph = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 auto;
  display: inline-block;
`
const Title = styled.div`
  font-size: 16px;
`
const LinkText = styled.a`
  color: blue;
  text-decoration: underline;
`
const FootprintInputWrap = styled.div`
  background-color: ${colors.lightGray};
  width: 100%;
  padding: 30px;
  ${media.phone`
    padding: 0px;
  `}
`
const Row = styled.div`
  flex-direction: row;
  display: flex;
`
const SelectWrap = styled(Select)`
  width: 50%;
  margin-left: 16px;
`
const InputHint = styled.div`
  color: ${colors.darkGray};
  padding-top: 16px;
`
const UpdateFootprintButton = styled(PrimaryButton)`
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.green};
  &:hover {
    color: ${colors.white};
  }
  margin-top: 16px;
`
class PersonalizedFootprint extends React.Component {
  state = {
    selectedMetric: METRICS.TONS,
    footprintValue: null,
  }

  handleMetricsChange = selectedMetric => {
    this.setState({ selectedMetric })
  }

  handleConfirmUpdateFootprint = footprintValue => {
    const { updateFootprint } = this.props
    if (updateFootprint) updateFootprint(footprintValue)
    this.setState({ footprintValue: null })
  }

  updateFootprint = async () => {
    const { footprintValue, selectedMetric } = this.state
    const footprint = Number(footprintValue)
    const personalizedFootprint =
      selectedMetric === METRICS.TONS ? footprint * 1000 : footprint
    let baseCountryValue
    const avarageFootprint = await this.props.getCountryAvarageFootprint()
    if (avarageFootprint) baseCountryValue = avarageFootprint * 0.2
    if (baseCountryValue && personalizedFootprint < baseCountryValue)
      this.showConfirmModal()
    else this.handleConfirmUpdateFootprint(personalizedFootprint)
  }

  showConfirmModal = () => {
    const {
      intl: { formatMessage },
    } = this.props
    Modal.confirm({
      title: formatMessage({
        id: 'app.pages.footprint.alert.title',
      }),
      content: formatMessage({
        id: 'app.pages.footprint.alert.text',
      }),
      okText: formatMessage({
        id: 'app.pages.footprint.alert.confirm',
      }),
      cancelText: formatMessage({
        id: 'app.pages.footprint.alert.edit',
      }),
      okType: 'primary',
      className: 'ant-modal-footprint_profile-page',
      centered: true,
      onOk: () =>
        this.handleConfirmUpdateFootprint(Number(this.state.footprintValue)),
    })
  }

  handleInputFootprint = e => {
    this.setState({ footprintValue: e.target.value })
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const { footprintValue } = this.state
    return (
      <div>
        <Paragraph>
          <Title>
            <FormattedMessage id="app.pages.footprint.personalizedFootprint" />
          </Title>
        </Paragraph>
        <Paragraph>
          <FormattedMessage id="app.pages.footprint.personalizedFootprint.first.paragraph" />
        </Paragraph>
        <Paragraph>
          <FormattedMessage id="app.pages.footprint.personalizedFootprint.second.paragraph" />
        </Paragraph>
        <FootprintInputWrap>
          <Row>
            <Input
              type="text"
              placeholder={formatMessage({
                id: 'app.pages.footprint.enterFootprint',
              })}
              onChange={this.handleInputFootprint}
              value={this.state.footprintValue}
            />
            <SelectWrap
              defaultValue={METRICS.TONS}
              onChange={this.handleMetricsChange}
              className="ant-select__override-for__register-page"
              dropdownClassName="ant-select__override-for__register-page"
              suffixIcon={<img src={arrowDownIcon} alt="arrowDownIcon" />}
            >
              {Object.values(METRICS).map(metric => (
                <Select.Option key={metric} value={metric}>
                  {metric}
                </Select.Option>
              ))}
            </SelectWrap>
          </Row>
          <UpdateFootprintButton
            disabled={
              Number.isNaN(Number(footprintValue)) ||
              Number(footprintValue) <= 0
            }
            loading={this.props.isFootprintUpdating}
            onClick={this.updateFootprint}
          >
            <FormattedMessage id="app.pages.footprint.unpdateFootprint" />
          </UpdateFootprintButton>
          <InputHint>
            <FormattedMessage id="app.pages.footprint.usePointDecimalSeparator" />
          </InputHint>
        </FootprintInputWrap>
        <Paragraph>
          <FormattedMessage id="app.pages.footprint.listOfNoCostCarbon" />
        </Paragraph>
        <div>
          <LinkText href={natureLink}>{natureLabel}</LinkText>
        </div>
        <div>
          <LinkText href={coolclimateLink}>{coolclimateLabel}</LinkText>
        </div>
      </div>
    )
  }
}

export default compose(injectIntl)(PersonalizedFootprint)

PersonalizedFootprint.propTypes = {
  intl: PropTypes.object.isRequired,
  updateFootprint: PropTypes.func,
  isFootprintUpdating: PropTypes.bool,
  getCountryAvarageFootprint: PropTypes.fucn,
}
