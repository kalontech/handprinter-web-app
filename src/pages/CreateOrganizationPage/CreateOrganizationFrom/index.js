import React from 'react'
import styled from 'styled-components'
import { Form, Button, Select, Cascader } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Input, FormItem, Checkbox, DefaultButton } from 'components/Styled'
import getValidationRules from 'config/validationRules'
import colors from 'config/colors'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'

import ECONOMIC_SECTOR_TYPES from './sectors'
import {
  ORGANIZATION_TYPES,
  ANNUAL_REVENUE_PROFIT,
  ANNUAL_REVENUE_NON_PROFIT,
} from './utils'

const StyledForm = styled(Form)`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${Checkbox} {
    color: ${colors.dark};
  }
`

const ScrollView = styled.div`
  overflow: scroll;
  width: 100%;
  heigth: 100%;
  flex: 1;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const TextLinkSuffix = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
  margin-left: 5px;
  display: block;
`

const BasisFootprintText = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.dark};
  margin-right: 4px;
  display: block;
`

const BasisWrapper = styled(Row)`
  margin-bottom: 10px;
  margin-top: -5px;
`

class CreateOrganizationFrom extends React.Component {
  state = {
    nameIsAvailable: false,
    companyType: undefined,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      handleSubmit,
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        // TODO send request
        if (handleSubmit) handleSubmit(values)
      }
    })
  }

  onNameChange = e => {
    const name = e.target.value
    const focusCallback = () => {
      if (this.inputName) this.inputName.focus()
    }
    // TODO check name
    if (name) this.setState({ nameIsAvailable: true }, focusCallback)
    else this.setState({ nameIsAvailable: false }, focusCallback)
  }

  handleCompanyTypeSelect = typeId => {
    this.setState({ companyType: typeId })
    this.props.form.setFieldsValue({ annualRevenue: undefined })
  }

  convertSectorData = data => {
    if (!data) return undefined
    return data.map(i => {
      return {
        value: i.name,
        label: i.name,
        children: this.convertSectorData(i.items),
      }
    })
  }

  filterSectors = (inputValue, path) => {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      intl: { formatMessage },
    } = this.props
    const { nameIsAvailable, companyType } = this.state
    let annualRevenue = []
    if (companyType === ORGANIZATION_TYPES[0]._id)
      annualRevenue = ANNUAL_REVENUE_PROFIT
    if (companyType === ORGANIZATION_TYPES[1]._id)
      annualRevenue = ANNUAL_REVENUE_NON_PROFIT

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <ScrollView>
          <FormItem>
            {getFieldDecorator('organizationName', {
              rules: getValidationRules(formatMessage).organizationName,
            })(
              <Input
                type="text"
                ref={ref => (this.inputName = ref)}
                placeholder={formatMessage({
                  id: 'app.createOrganization.organizationName',
                })}
                onChange={this.onNameChange}
                suffix={
                  nameIsAvailable &&
                  formatMessage({
                    id: 'app.createOrganization.organizationName.available',
                  })
                }
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('organizationUrl', {
              rules: getValidationRules(formatMessage).url,
            })(
              <Row>
                <Input
                  type="text"
                  placeholder={formatMessage({
                    id: 'app.createOrganization.url',
                  })}
                />
                <TextLinkSuffix>.handprinter.org</TextLinkSuffix>
              </Row>,
            )}
          </FormItem>
          <FormItem style={{ marginTop: '-3px' }}>
            {getFieldDecorator('type', {
              rules: getValidationRules(formatMessage).required,
            })(
              <Select
                placeholder={formatMessage({
                  id: 'app.forms.typeOfOrganization',
                })}
                optionFilterProp="children"
                className="ant-select__override-for__register-page"
                dropdownClassName="ant-select__override-for__register-page"
                onSelect={this.handleCompanyTypeSelect}
                suffixIcon={<img src={arrowDownIcon} />}
              >
                {ORGANIZATION_TYPES.map(i => (
                  <Select.Option key={i._id} value={i._id}>
                    <FormattedMessage id={i.name} />
                  </Select.Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('privateOrganization', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                <FormattedMessage id="app.createOrganization.privateOrganization" />
              </Checkbox>,
            )}
          </FormItem>
          <BasisWrapper>
            <BasisFootprintText>
              <FormattedMessage id={'app.createOrganization.basisFootprint'} />
            </BasisFootprintText>
            <InfoElement
              type={INFO_ELEMENT_TYPES.INFO}
              tooltipProps={{
                title: formatMessage({
                  id: 'app.createOrganization.basisFootprintTooltip',
                }),
              }}
            />
          </BasisWrapper>
          <FormItem style={{ marginTop: '-3px' }}>
            {getFieldDecorator('economicSector', {
              rules: getValidationRules(formatMessage).required,
            })(
              <Cascader
                options={this.convertSectorData(ECONOMIC_SECTOR_TYPES)}
                showSearch={{ filter: this.filterSectors }}
                placeholder={formatMessage({
                  id: 'app.forms.economicSector',
                })}
                suffixIcon={<img src={arrowDownIcon} />}
                className="ant-select__override-for__register-page"
                dropdownClassName="ant-select__override-for__register-page"
              />,
            )}
          </FormItem>
          <FormItem style={{ marginTop: '-3px' }}>
            {getFieldDecorator('annualRevenue', {
              rules: getValidationRules(formatMessage).required,
            })(
              <Select
                placeholder={formatMessage({
                  id: 'app.forms.annualRevenue',
                })}
                optionFilterProp="children"
                className="ant-select__override-for__register-page"
                dropdownClassName="ant-select__override-for__register-page"
                suffixIcon={<img src={arrowDownIcon} />}
              >
                {annualRevenue
                  .map(j => {
                    return {
                      _id: j,
                      name: j,
                    }
                  })
                  .map(i => (
                    <Select.Option key={i._id} value={i._id}>
                      <FormattedMessage id={i.name} />
                    </Select.Option>
                  ))}
              </Select>,
            )}
          </FormItem>
        </ScrollView>
        <ButtonsWrapper>
          <DefaultButton
            style={{ width: '49%', minWidth: '10px' }}
            onClick={this.props.handleBack}
          >
            <FormattedMessage id="app.createOrganization.back" />
          </DefaultButton>
          <Button style={{ width: '49%' }} htmlType="submit" type="primary">
            <FormattedMessage id="app.createOrganization.continue" />
          </Button>
        </ButtonsWrapper>
      </StyledForm>
    )
  }
}

CreateOrganizationFrom.propTypes = {
  form: PropTypes.shape({
    setFields: PropTypes.func.isRequired,
    getFieldsValue: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }),
  intl: PropTypes.object.isRequired,
  handleBack: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default Form.create({ name: 'createOrganization' })(
  injectIntl(CreateOrganizationFrom),
)
