import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AutoComplete, Icon, Tag, Select } from 'antd'

import { getUserInitialAvatar } from 'api'
import { Input } from 'components/Styled'
import colors from 'config/colors'

const SearchItemImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  object-fit: cover;
  margin: 10px 14px 10px 0px;
`

const MultipleInputWrap = styled.div`
  border-radius: 5px;
  border: 1px solid ${colors.gray};
  width: 100%;
  background-color: ${colors.white};
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 46px;
  margin-bottom: 10px;
  .ant-tag {
    margin: 5px;
  }
`

const InputWrap = styled.span`
  flex-grow: 1;
  .ant-input {
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

const Wrap = styled.div`
  width: 100%;
`

const AutoCompleteStyled = styled(AutoComplete)`
  width: 100%;
  justify-content: center;
  > div:first-child {
    width: 100%;
  }
`

const SearchItem = styled(Select.Option)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${colors.white};
  border-radius: 4px;
  height: 46px;
  overflow: hidden;
`

class SearchableInput extends React.Component {
  static defaultProps = {
    placeholder: 'Search',
    values: [],
    suggestions: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      values: props.values,
      query: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.values !== this.props.values) {
      this.setState({ values: this.props.values })
    }
    if (prevState.values !== this.state.values) {
      this.onValuesChange()
    }
  }

  onValuesChange = values => {
    if (this.props.onValuesChange) {
      this.props.onValuesChange(this.state.values)
    }
  }

  handleSelect = id => {
    const { suggestions } = this.props
    const { values } = this.state
    const suggestion = suggestions.find(i => i._id === id)
    const existingAdmin = values.find(i => i._id === id)
    if (suggestion && !existingAdmin) {
      this.setState(
        {
          values: this.state.values.concat(suggestion),
          query: '',
        },
        this.onValuesChange,
      )
    }
  }

  handleRemoveValue = value => {
    const values = this.state.values.concat()
    const valueIndex = values.findIndex(i => i._id === value._id)
    if (valueIndex >= 0) {
      values.splice(valueIndex, 1)
      this.setState({ values })
    }
  }

  handleSearch = query => {
    // If contains not only spaces
    if (!/^ *$/.test(query)) {
      this.setState({ query })
      if (this.props.onSearch) this.props.onSearch(query)
    } else {
      this.setState({ query: '' })
    }
  }

  handleAddAdmin = e => {
    const query = e.target.value.trim()
    const existingValue = this.state.values.find(i => i.fullName === query)
    if (!existingValue) {
      this.setState(
        {
          values: this.state.values.concat({
            _id: query,
            fullName: query,
          }),
          query: '',
        },
        this.onValuesChange,
      )
    }
  }

  handleKeyPress = e => {
    if (e.charCode === 32) {
      this.handleAddAdmin(e)
    }
  }

  render() {
    const { values, query } = this.state
    const { suggestions, placeholder } = this.props
    return (
      <Wrap>
        <MultipleInputWrap>
          {values.map(value => {
            return (
              <Tag
                key={value._id}
                closable={true}
                afterClose={() => this.handleRemoveValue(value)}
              >
                {value.fullName}
              </Tag>
            )
          })}

          <InputWrap>
            <AutoCompleteStyled
              onSelect={this.handleSelect}
              onSearch={this.handleSearch}
              value={query}
              dataSource={suggestions.map(item => (
                <SearchItem key={item._id}>
                  <SearchItemImg
                    src={item.picture || getUserInitialAvatar(item.fullName)}
                    alt={item.fullName}
                  />
                  {item.fullName}
                </SearchItem>
              ))}
            >
              <Input
                onPressEnter={this.handleAddAdmin}
                onKeyPress={this.handleKeyPress}
                placeholder={placeholder}
                suffix={
                  <Icon
                    type="search"
                    style={{ color: colors.darkGray, fontSize: '18px' }}
                  />
                }
              />
            </AutoCompleteStyled>
          </InputWrap>
        </MultipleInputWrap>
      </Wrap>
    )
  }
}

SearchableInput.propTypes = {
  values: PropTypes.array,
  suggestions: PropTypes.array,
  query: PropTypes.string,
  handleRemoveValue: PropTypes.func,
  placeholder: PropTypes.string,
  onValuesChange: PropTypes.func,
  onSearch: PropTypes.func,
}

export default SearchableInput
