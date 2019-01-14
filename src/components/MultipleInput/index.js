import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Form, Icon, Tag, Tooltip } from 'antd'
import styled from 'styled-components'

import {
  MAX_SHARE_EMAILS_LENGTH,
  MAX_VISIBLE_EMAIL_LENGTH,
} from '../../config/common'
import getValidationRules from './../../config/validationRules'
import colors from './../../config/colors'
import { FormItem, Input } from './../../components/Styled'
import decodeError from './../../utils/decodeError'

export const MultipleInputWrap = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${colors.gray};
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 47px;
  .ant-tag {
    margin: 5px;
  }
  .ant-input {
    height: 34px;
  }
`

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  .ant-input {
    height: 30px;
    border: none;
    border-bottom: 1px solid ${colors.gray};
    border-radius: 0;
    margin-right: 10px;
    width: 100%;
    &:focus {
      box-shadow: none;
    }
  }
  .ant-input:focus {
    border-color: none;
  }
`

export const AddEmailButton = styled(Tag)`
  background: ${colors.white};
  borderstyle: dashed;
`

export const StyledInput = styled(Input)`
  height: 30px;
  border: none;
`

export const Wrap = styled.div`
  width: 100%;
`

class MultipleInput extends Component {
  state = {
    inputVisible: false,
  }

  componentDidMount() {
    const {
      form: { setFields },
      intl: { formatMessage },
      error,
    } = this.props

    if (error) {
      setFields({
        errorMultipleInput: {
          errors: error
            ? [new Error(formatMessage({ id: decodeError(error) }))]
            : [],
        },
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      form: { setFields },
      intl: { formatMessage },
      error,
    } = this.props

    if (prevProps.error !== error) {
      setFields({
        errorMultipleInput: {
          errors: error
            ? [new Error(formatMessage({ id: decodeError(error) }))]
            : [],
        },
      })
    }
  }

  handleAddEmailInputChange = e => {
    this.props.form.setFieldsValue({ multipleInput: e.target.value })
  }

  handleAddValueConfirm = e => {
    e.preventDefault()
    const {
      onChange,
      form: { setFields, validateFields, resetFields },
      values,
    } = this.props

    validateFields((err, { multipleInput }) => {
      if (!err) {
        let invitesModifed = values
        // add new email if it's unique value of values array
        if (multipleInput && values.indexOf(multipleInput) === -1) {
          invitesModifed = [...values, multipleInput]
        }
        this.setState({
          inputVisible: false,
        })
        onChange(invitesModifed)
        setFields({ errorNewInviteValue: [] })
        resetFields(['multipleInput'])
      } else {
        setFields({ errorNewInviteValue: err.multipleInput })
      }
    })
  }

  showMultipleInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleRemoveValue = removedValue => {
    const { onChange, values } = this.props
    onChange(values.filter(email => email !== removedValue))
  }

  renderInviteTag = value => {
    const isLongTag = value.length > MAX_VISIBLE_EMAIL_LENGTH
    const tagElem = (
      <Tag
        key={value}
        closable={true}
        afterClose={() => this.handleRemoveValue(value)}
      >
        {isLongTag ? `${value.slice(0, 20)}...` : value}
      </Tag>
    )
    return isLongTag ? (
      <Tooltip title={value} key={value}>
        {tagElem}
      </Tooltip>
    ) : (
      tagElem
    )
  }

  multipleInputRef = input => (this.input = input)

  render() {
    const {
      intl: { formatMessage },
      form: { getFieldDecorator },
      values,
    } = this.props
    const { inputVisible } = this.state
    return (
      <Wrap>
        <MultipleInputWrap>
          {!inputVisible && values.map(this.renderInviteTag)}
          {inputVisible && (
            <InputWrap>
              {getFieldDecorator('multipleInput', {
                rules: getValidationRules(formatMessage).email,
              })(
                <StyledInput
                  ref={this.multipleInputRef}
                  type="text"
                  size="small"
                  onChange={this.handleAddEmailInputChange}
                  onBlur={this.handleAddValueConfirm}
                  onPressEnter={this.handleAddValueConfirm}
                />,
              )}
              <AddEmailButton onClick={this.handleAddValueConfirm}>
                <Icon type="plus" />{' '}
                <FormattedMessage id="app.increaseHandprintPage.form.add" />
              </AddEmailButton>
            </InputWrap>
          )}
          {!inputVisible && values.length !== MAX_SHARE_EMAILS_LENGTH && (
            <AddEmailButton onClick={this.showMultipleInput}>
              <Icon type="plus" />{' '}
              <FormattedMessage id="app.increaseHandprintPage.form.addEmail" />
            </AddEmailButton>
          )}
        </MultipleInputWrap>
        <FormItem>
          {getFieldDecorator('errorMultipleInput')(<Input type="hidden" />)}
        </FormItem>
      </Wrap>
    )
  }
}

MultipleInput.propTypes = {
  error: PropTypes.string,
  values: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Form.create()(injectIntl(MultipleInput))
