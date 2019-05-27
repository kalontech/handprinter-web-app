// @flow

import React from 'react'

import OutsideClickHandler from 'react-outside-click-handler'
import { injectIntl } from 'react-intl'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import arrowUpIcon from 'assets/icons/arrowUp.svg'
import arrowRightIcon from 'assets/icons/arrowRight.svg'

import {
  Row,
  RelativeView,
  DropDownContainer,
  SearchWrap,
  AutoCompleteStyled,
  SearchItem,
  SearchItemImg,
  BackIcon,
  SearchIcon,
  Input,
  SearchHeader,
  SearchHeaderText,
  ArrowImage,
  DropdownHeaderText,
  DropdownText,
  SearchItemColumn,
  SearchItemHeader,
  SearchItemText,
} from './styled'

type Props = {
  intl: any,
  dropdownList: Array<string>,
  suggestions: Array<Object>,
  onSearch: string => void,
  onChange: string => void,
  onSelect: string => void,
}

class SearchInfluencerInput extends React.Component<Props> {
  static defaultProps = {
    dropdownList: ['Individual'],
    suggestions: [],
  }

  state = {
    selectedValue: undefined, // value in input field
    dropdownOpened: undefined,
    selectedMenuIndex: undefined, // user clicks dropdown item
    searchQuery: '',
    hoveringDropdownIndex: undefined,
  }

  showDropdown = () => {
    this.setState({ dropdownOpened: true })
  }

  hideDropdown = () => {
    setImmediate(() => {
      this.setState({ dropdownOpened: false })
    })
  }

  handleDropdownItemSelected = selectedMenuValue => {
    const dropdownList = this.props.dropdownList
    this.setState({
      selectedMenuIndex: dropdownList.indexOf(selectedMenuValue),
      hoveringDropdownIndex: undefined,
    })
  }

  clearMenuIndex = () => {
    this.setState({ selectedMenuIndex: undefined })
  }

  handleDropdownIconClick = () => {
    this.setState({ dropdownOpened: !this.state.dropdownOpened })
  }

  handleSelect = id => {
    const { suggestions, onSelect } = this.props
    const suggestion = suggestions.find(i => i._id === id)
    if (suggestion) {
      this.setState({ selectedValue: suggestion.invitationCode })
    }
    if (onSelect) onSelect(suggestion.invitationCode)
  }

  onChange = e => {
    this.setState({ selectedValue: e.target.value })
    const onChange = this.props.onChange
    if (onChange) onChange(e.target.value)
  }

  handleSearch = searchQuery => {
    this.setState({ searchQuery })
    const onSearch = this.props.onSearch
    if (onSearch) onSearch(searchQuery)
  }

  handleMouseEnterDropdown = index => {
    this.setState({ hoveringDropdownIndex: index })
  }

  handleMouseLeaveDropdown = () => {
    this.setState({ hoveringDropdownIndex: undefined })
  }

  render() {
    const {
      intl: { formatMessage },
      dropdownList,
      suggestions,
    } = this.props
    const {
      selectedValue,
      dropdownOpened,
      selectedMenuIndex,
      searchQuery,
      hoveringDropdownIndex,
    } = this.state

    return (
      <OutsideClickHandler onOutsideClick={this.hideDropdown}>
        <RelativeView>
          <Input
            onClick={this.showDropdown}
            value={selectedValue}
            onChange={this.onChange}
            placeholder={formatMessage({ id: 'app.forms.invitationCode' })}
            suffix={
              <Row>
                <InfoElement
                  type={INFO_ELEMENT_TYPES.INFO}
                  tooltipProps={{
                    title: formatMessage({
                      id: 'app.forms.invitationCode.hint',
                    }),
                  }}
                />
                <ArrowImage
                  src={dropdownOpened ? arrowUpIcon : arrowDownIcon}
                  onClick={this.handleDropdownIconClick}
                />
              </Row>
            }
          />
          {dropdownOpened && (
            <DropDownContainer>
              {selectedMenuIndex === undefined ? (
                <div>
                  <DropdownHeaderText>
                    {formatMessage({
                      id: 'app.search.influencer.searchForInfluencer',
                    })}
                  </DropdownHeaderText>
                  {dropdownList.map(i => (
                    <DropdownText
                      onMouseEnter={() => this.handleMouseEnterDropdown(i)}
                      onMouseLeave={this.handleMouseLeaveDropdown}
                      onClick={() => this.handleDropdownItemSelected(i)}
                      key={i}
                    >
                      {i}
                      {hoveringDropdownIndex === i && (
                        <img src={arrowRightIcon} />
                      )}
                    </DropdownText>
                  ))}
                </div>
              ) : (
                <div>
                  <SearchHeader>
                    <BackIcon type={'left'} onClick={this.clearMenuIndex} />
                    <SearchHeaderText>
                      {dropdownList[selectedMenuIndex]}
                    </SearchHeaderText>
                  </SearchHeader>
                  <SearchWrap>
                    <AutoCompleteStyled
                      onSelect={this.handleSelect}
                      onSearch={this.handleSearch}
                      dataSource={suggestions.map(item => (
                        <SearchItem
                          style={{
                            padding: 0,
                            flexDirection: 'row',
                            display: 'flex',
                          }}
                          key={item._id}
                        >
                          <SearchItemImg src={item.photo} alt={item.fullName} />
                          <SearchItemColumn>
                            <SearchItemHeader>{item.fullName}</SearchItemHeader>
                            <SearchItemText>
                              {item.invitationCode}
                            </SearchItemText>
                          </SearchItemColumn>
                        </SearchItem>
                      ))}
                    >
                      <Input
                        placeholder={formatMessage({
                          id: 'app.actionsPage.searchPlaceholder',
                        })}
                        value={searchQuery}
                        suffix={<SearchIcon type="search" />}
                      />
                    </AutoCompleteStyled>
                  </SearchWrap>
                </div>
              )}
            </DropDownContainer>
          )}
        </RelativeView>
      </OutsideClickHandler>
    )
  }
}

export default injectIntl(SearchInfluencerInput)
