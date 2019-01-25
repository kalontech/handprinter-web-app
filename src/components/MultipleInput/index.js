import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Form, Tag, Tooltip } from 'antd'
import styled from 'styled-components'

import {
  MAX_SHARE_EMAILS_LENGTH,
  MAX_VISIBLE_EMAIL_LENGTH,
} from 'config/common'
import getValidationRules from 'config/validationRules'
import colors from 'config/colors'
import { FormItem, Input } from 'components/Styled'
import decodeError from 'utils/decodeError'

const MultipleInputWrap = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${colors.gray};
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 47px;
  .ant-tag {
    margin: 5px;
  }
  .ant-input {
    height: 34px;
  }
`

const InputWrap = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-start;

  .ant-input {
    height: 30px;
    border: none;
    border-radius: 0;
    margin-right: 10px;
    width: 100%;

    &:focus {
      box-shadow: none;
    }
  }

  .ant-input:focus {
    border-color: transparent;
  }
`

const StyledInput = styled(Input)`
  height: 30px;
  border: none;
`

const Wrap = styled.div`
  width: 100%;
`

class MultipleInput extends Component {
  state = {
    inputVisible: false,
  }

  multipleInputRef = React.createRef()

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

  componentDidUpdate = prevProps => {
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
    const {
      form: { setFieldsValue, getFieldValue },
      onChange,
      values,
    } = this.props
    setFieldsValue({ multipleInput: e.target.value })
    onChange(values, Boolean(getFieldValue('multipleInput')))
  }

  handleAddValueConfirm = e => {
    e.preventDefault()
    const {
      onChange,
      form: { setFields, validateFields, resetFields, getFieldValue },
      values,
    } = this.props

    if (!getFieldValue('multipleInput')) {
      setFields({ errorMultipleInput: [] })
      onChange(values, false)
      return
    }

    validateFields((err, { multipleInput }) => {
      if (!err) {
        let invitesModified = values
        // add new email if it's unique value of values array
        if (multipleInput && values.indexOf(multipleInput) === -1) {
          invitesModified = [...values, multipleInput]
        }
        this.setState({
          inputVisible: false,
        })
        onChange(invitesModified)
        setFields({ errorMultipleInput: [] })
        resetFields(['multipleInput'])
      } else {
        setFields({
          errorMultipleInput: {
            errors: err.multipleInput.errors,
          },
        })
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

  render() {
    const {
      intl: { formatMessage },
      form: { getFieldDecorator },
      values,
      placeholder,
    } = this.props

    return (
      <Wrap>
        <MultipleInputWrap>
          {values.map(value => {
            const isLongTag = value.length > MAX_VISIBLE_EMAIL_LENGTH
            const TooltipWrap = isLongTag ? Tooltip : React.Fragment
            const title = isLongTag ? { title: value } : {}

            return (
              <TooltipWrap {...title} key={value}>
                <Tag
                  closable={true}
                  afterClose={() => this.handleRemoveValue(value)}
                >
                  {isLongTag ? `${value.slice(0, 20)}...` : value}
                </Tag>
              </TooltipWrap>
            )
          })}

          <InputWrap>
            {values.length !== MAX_SHARE_EMAILS_LENGTH &&
              getFieldDecorator('multipleInput', {
                rules: getValidationRules(formatMessage).email,
              })(
                <StyledInput
                  ref={this.multipleInputRef}
                  type="text"
                  size="small"
                  placeholder={
                    placeholder ||
                    formatMessage({
                      id: 'app.increaseHandprintPage.form.enterEmailAddress',
                    })
                  }
                  onChange={this.handleAddEmailInputChange}
                  onBlur={this.handleAddValueConfirm}
                  onPressEnter={this.handleAddValueConfirm}
                />,
              )}
          </InputWrap>
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
  placeholder: PropTypes.string,
}

export default Form.create()(injectIntl(MultipleInput))
