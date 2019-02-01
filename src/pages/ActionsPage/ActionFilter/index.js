import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { FormattedMessage } from 'react-intl'
import { isEqual } from 'lodash'

import colors from '../../../config/colors'
import icons from '../../../components/ActionCardLabel/icons'
import ImpactSlider from './slider'
import { IMPACT_CATEGORIES } from '../../../utils/constants'
import { history } from './../../../appRouter'

const ClearAllIcon = styled(Icon)`
  transform: rotate(45deg);
  font-size: 24px;
`

const ClearAllButton = styled.button`
  background: white;
  cursor: pointer;
  border: none;
  outline: none;
`

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  color: ${colors.darkGray};
  letter-spacing: 0.2px;
`

class ActionsFilters extends Component {
  constructor(props) {
    super(props)
    const timeValuesCount = Object.keys(props.timeValues).length - 1
    let values = {
      climate: [0, timeValuesCount],
      health: [0, timeValuesCount],
      ecosystem: [0, timeValuesCount],
      water: [0, timeValuesCount],
      waste: [0, timeValuesCount],
    }

    if (props.values) {
      // convert values from query ([15, 52000])
      // to values for filter (from 0 to time values count)
      Object.keys(props.values).forEach(impactName => {
        values[impactName][0] = props.timeValues.findIndex(
          elem => elem.minutes === props.values[impactName][0],
        )
        values[impactName][1] = props.timeValues.findIndex(
          elem => elem.minutes === props.values[impactName][1],
        )
      })
    }

    this.state = {
      values,
      timeValues: [],
      timeValuesCount,
      filterIsChanged: false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      timeValues: props.timeValues || state.timeValues,
    }
  }

  handleChange = (values, impactName) => {
    this.setState({
      values: {
        ...this.state.values,
        [impactName]: values,
      },
      filterIsChanged: true,
    })
  }

  createQuery = () => {
    const { timeValues } = this.props
    const { values, timeValuesCount } = this.state
    let data = {}
    let activeFilterCount = 0

    Object.keys(values).forEach(key => {
      if (!isEqual(values[key], [0, timeValuesCount])) {
        data[key] = {
          from: timeValues[values[key][0]].minutes,
          to: timeValues[values[key][1]].minutes,
        }
      }

      // increase activeFilterCount if filter is changed
      if (!isEqual(values[key], [0, timeValuesCount])) {
        activeFilterCount++
      }
    })

    return { data, activeFilterCount }
  }

  resetFilter = () => {
    const { timeValuesCount } = this.state
    this.setState(
      {
        values: {
          climate: [0, timeValuesCount],
          health: [0, timeValuesCount],
          ecosystem: [0, timeValuesCount],
          water: [0, timeValuesCount],
          waste: [0, timeValuesCount],
        },
        filterIsChanged: false,
      },
      () => {
        this.props.onAfterChange(this.createQuery())
        history.push(`/actions/${this.props.actionsPageSubset}`)
      },
    )
  }

  render() {
    const { values, filterIsChanged } = this.state
    const { timeValues, actionsPageSubset } = this.props
    return (
      <Fragment>
        <ImpactSlider
          onAfterChange={() => this.props.onAfterChange(this.createQuery())}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.CLIMATE)
          }
          value={values.climate}
          timeValues={timeValues}
          icon={icons.positive.climate}
        />
        <ImpactSlider
          onAfterChange={() => this.props.onAfterChange(this.createQuery())}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.HEALTH)
          }
          value={values.health}
          timeValues={timeValues}
          icon={icons.positive.health}
        />
        <ImpactSlider
          onAfterChange={() => this.props.onAfterChange(this.createQuery())}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.ECOSYSTEM)
          }
          value={values.ecosystem}
          timeValues={timeValues}
          icon={icons.positive.ecosystem}
        />
        <ImpactSlider
          onAfterChange={() => this.props.onAfterChange(this.createQuery())}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.WATER)
          }
          value={values.water}
          timeValues={timeValues}
          icon={icons.positive.water}
        />
        <ImpactSlider
          onAfterChange={() => this.props.onAfterChange(this.createQuery())}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.WASTE)
          }
          value={values.waste}
          timeValues={timeValues}
          icon={icons.positive.waste}
        />

        <ButtonsWrap>
          {filterIsChanged && (
            <Fragment>
              <ClearAllButton
                onClick={() => {
                  this.resetFilter()
                  this.props.onReset()
                }}
              >
                <ClearAllIcon type="plus" />
              </ClearAllButton>
              <FormattedMessage id="app.actionsPage.clearAllFilters" />
            </Fragment>
          )}
        </ButtonsWrap>
      </Fragment>
    )
  }
}

ActionsFilters.propTypes = {
  onAfterChange: PropTypes.func.isRequired,
}

export default ActionsFilters
