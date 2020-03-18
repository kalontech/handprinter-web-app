import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import { injectIntl } from 'react-intl'

import { Checkbox } from '../../../components/Styled'
import ActionUnitSelect from '../../../components/ActionUnitSelect'
import { SelectWrapper, Block, UnitsBlock } from './styled'
import { categories, behaviour, types } from './filterData'

const { Option } = Select

function ActionsFilters({ intl: { formatMessage }, ...props }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedType, setSelectedType] = useState([])
  const [selectedBehaviour, setSelectedBehaviour] = useState([])

  const handleCategoryChange = value => {
    let categories = selectedCategories.concat([])
    if (!value) {
      categories = []
    } else {
      if (categories.includes(value)) {
        categories.splice(categories.indexOf(value), 1)
      } else {
        categories.push(value)
      }
    }
    setSelectedCategories(categories)
    props.onAfterChange({ data: { category: categories } })
  }

  const handleTypeChange = value => {
    let types = selectedType.concat([])
    if (!value) {
      types = []
    } else {
      if (selectedType.includes(value)) {
        types.splice(types.indexOf(value), 1)
      } else {
        types.push(value)
      }
    }
    setSelectedType(types)
    props.onAfterChange({ data: { type: types } })
  }

  const handleBehaviourChange = value => {
    let behaviours = selectedBehaviour.concat([])
    if (!value) {
      behaviours = []
    } else {
      if (selectedBehaviour.includes(value)) {
        behaviours.splice(behaviours.indexOf(value), 1)
      } else {
        behaviours.push(value)
      }
    }
    setSelectedBehaviour(behaviours)
    props.onAfterChange({ data: { behaviour: behaviours } })
  }

  return (
    <Fragment>
      <SelectWrapper>
        <Block>
          <Select
            allowClear={true}
            mode="default"
            style={{ width: '100%' }}
            onChange={handleCategoryChange}
            menuItemSelectedIcon={<Icon />}
            value="Category"
          >
            {categories.map(category => {
              return (
                <Option key={category.id}>
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    name={category.name}
                  >
                    {category.name}
                  </Checkbox>
                </Option>
              )
            })}
          </Select>
          <Select
            allowClear={true}
            value={formatMessage({
              id: 'app.actions.type',
            })}
            mode="default"
            style={{ width: '100%' }}
            onChange={handleTypeChange}
            menuItemSelectedIcon={<Icon />}
          >
            {types.map(type => {
              return (
                <Option key={type.name}>
                  <Checkbox
                    checked={selectedType.includes(type.name)}
                    name={type.name}
                  >
                    {formatMessage({
                      id: `app.actions.type.${type.id}`,
                    })}
                  </Checkbox>
                </Option>
              )
            })}
          </Select>
          <Select
            allowClear={true}
            value={formatMessage({
              id: 'app.actions.behaviour',
            })}
            mode="default"
            style={{ width: '100%' }}
            onChange={handleBehaviourChange}
            menuItemSelectedIcon={<Icon />}
          >
            {behaviour.map(behaviour => {
              return (
                <Option key={behaviour.name}>
                  <Checkbox
                    checked={selectedBehaviour.includes(behaviour.name)}
                    name={behaviour.name}
                  >
                    {formatMessage({
                      id: `app.actions.behaviour.${behaviour.id}`,
                    })}
                  </Checkbox>
                </Option>
              )
            })}
          </Select>
        </Block>
        <UnitsBlock>
          <ActionUnitSelect toggleUnits={e => props.toggleUnits(e)} />
        </UnitsBlock>
      </SelectWrapper>
    </Fragment>
  )
}

ActionsFilters.propTypes = {
  onAfterChange: PropTypes.func.isRequired,
  toggleUnits: PropTypes.func.isRequired,
  timeValues: PropTypes.array,
  onReset: PropTypes.func,
  closeModal: PropTypes.func,
  values: PropTypes.object,
  showFilter: PropTypes.bool.isRequired,
  inModal: PropTypes.bool,
  intl: PropTypes.object,
}

export default injectIntl(ActionsFilters)
