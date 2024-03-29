import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Icon } from 'antd'

import { Checkbox } from '../../components/Styled'
import { ClearAll, ModalItem } from './styled'
import colors from '../../config/colors'

const ActionFilterModal = props => {
  const [filterData, setFilterData] = useState([])
  const {
    isFilterModalOpen,
    setIsCategoryFilterOpen,
    setIsTypeFilterOpen,
    setIsBehaviourFilterOpen,
    isMobile,
    title,
    filtersData,
    handleOnAfterFiltersChange,
  } = props

  const handleCancel = () => {
    if (title.toLowerCase() === 'category') {
      setIsCategoryFilterOpen(false)
    } else if (title.toLowerCase() === 'type') {
      setIsTypeFilterOpen(false)
    } else if (title.toLowerCase() === 'behaviour') {
      setIsBehaviourFilterOpen(false)
    }
  }

  const handleApply = e => {
    e.stopPropagation()
    handleOnAfterFiltersChange({
      data: { [`${title.toLowerCase()}`]: filterData },
    })
    handleCancel()
  }

  const clearFilters = e => {
    e.stopPropagation()
    setFilterData([])
    handleOnAfterFiltersChange({
      data: { [`${title.toLowerCase()}`]: [] },
    })
    handleCancel()
  }

  const handleFilterChange = value => {
    let filters = filterData.concat([])
    if (!value) {
      filters = []
    } else {
      if (filterData.includes(value)) {
        filters.splice(filters.indexOf(value), 1)
      } else {
        filters.push(value)
      }
    }
    setFilterData(filters)
  }

  const selectedItems = (arr, lable) => {
    return arr.join('').length > 20
      ? `${lable}|${arr
          .map(i => ` ${i}`)
          .join(', ')
          .slice(0, 20)}...`
      : `${lable}|${arr.map(i => ` ${i}`)}`
  }

  return (
    <Modal
      bodyStyle={{
        padding: '0px 10px',
      }}
      title={`${selectedItems(filterData, title)}`}
      style={{ top: isMobile ? '70px' : '156px' }}
      visible={isFilterModalOpen}
      onOk={e => {
        e.stopPropagation()
        setIsCategoryFilterOpen(false)
        setIsTypeFilterOpen(false)
        setIsBehaviourFilterOpen(false)
      }}
      onCancel={e => {
        e.stopPropagation()
        handleCancel()
      }}
      footer={[
        <p
          key="submit"
          type="primary"
          onClick={handleApply}
          style={{
            marginRight: '45%',
            color: `${colors.green}`,
          }}
        >
          Apply
        </p>,
      ]}
      closable
    >
      <ClearAll onClick={clearFilters}>
        <Icon
          type="close-circle"
          theme="filled"
          style={{ marginRight: '10px', color: `${colors.gray}` }}
        />
        <p>Clear All</p>
      </ClearAll>
      {filtersData.map(item => {
        return (
          <ModalItem
            key={item.name}
            onClick={() => handleFilterChange(item.name)}
          >
            <div>
              <Checkbox
                checked={filterData.includes(item.name)}
                style={{ marginRight: '10px' }}
              />
              <p>{item.name}</p>
            </div>
            <span>12</span>
          </ModalItem>
        )
      })}
    </Modal>
  )
}

ActionFilterModal.propTypes = {
  isFilterModalOpen: PropTypes.bool,
  setIsCategoryFilterOpen: PropTypes.func,
  setIsTypeFilterOpen: PropTypes.func,
  setIsBehaviourFilterOpen: PropTypes.func,
  isMobile: PropTypes.bool,
  title: PropTypes.string,
  selectedFilters: PropTypes.string,
  filtersData: PropTypes.array,
  handleOnAfterFiltersChange: PropTypes.func,
}

export default ActionFilterModal
