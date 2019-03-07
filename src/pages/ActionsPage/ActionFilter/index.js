import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape } from 'react-intl'
import isEqual from 'lodash/isEqual'

import CloseIcon from 'assets/icons/CloseIcon'
import colors from 'config/colors'
import { IMPACT_CATEGORIES } from 'utils/constants'
import media from 'utils/mediaQueryTemplate'
import icons from 'components/ActionCardLabel/icons'
import { SecondaryButton } from 'components/Styled'

import ImpactSlider from './slider'

const ClearAllIcon = styled(CloseIcon)`
  width: 24px;
  height: 24px;
`

const ClearAllButton = styled.button`
  background: white;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
`

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  font-size: 14px;
  color: ${colors.darkGray};
  letter-spacing: 0.2px;

  ${media.phone`
    margin-bottom: 10px;
  `}
`

const ButtonSubmit = styled(SecondaryButton)`
  align-self: flex-end;
  background-color: ${colors.green};
  text-transform: capitalize;
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
      prevStateValues: values,
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

  get queries() {
    const { timeValues } = this.props
    const { values, timeValuesCount, prevStateValues } = this.state
    let data = {}
    let activeFilterCount = 0

    Object.keys(values).forEach(key => {
      // impact value is changed
      if (!isEqual(prevStateValues[key], values[key])) {
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

  handleChange = (values, impactName) => {
    this.setState(
      {
        prevStateValues: this.state.values,
        values: {
          ...this.state.values,
          [impactName]: values,
        },
        filterIsChanged: true,
      },
      () => {
        if (!this.props.inModal) {
          this.props.onAfterChange(this.queries)
        }
      },
    )
  }

  resetFilter = () => {
    const { timeValuesCount } = this.state
    const defaultValues = {
      climate: [0, timeValuesCount],
      health: [0, timeValuesCount],
      ecosystem: [0, timeValuesCount],
      water: [0, timeValuesCount],
      waste: [0, timeValuesCount],
    }
    this.setState(
      {
        values: defaultValues,
        prevStateValues: defaultValues,
        filterIsChanged: false,
      },
      () => {
        this.props.onAfterChange(this.queries)
      },
    )
  }

  onSubmit = () => {
    const { closeModal, onAfterChange } = this.props

    onAfterChange(this.queries)
    closeModal()
  }

  render() {
    const { values, filterIsChanged } = this.state
    const { timeValues, showFilter, inModal } = this.props
    return (
      <Fragment>
        {inModal && filterIsChanged && (
          <ButtonsWrap>
            <ClearAllButton
              onClick={() => {
                this.resetFilter()
                this.props.onReset()
              }}
            >
              <ClearAllIcon />
            </ClearAllButton>
            <FormattedMessage id="app.actionsPage.clearAllFilters" />
          </ButtonsWrap>
        )}

        <ImpactSlider
          showFilter={showFilter}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.CLIMATE)
          }
          value={values.climate}
          timeValues={timeValues}
          icon={icons.positive.climate}
          impactCategory={IMPACT_CATEGORIES.CLIMATE}
        />
        <ImpactSlider
          showFilter={showFilter}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.HEALTH)
          }
          value={values.health}
          timeValues={timeValues}
          icon={icons.positive.health}
          impactCategory={IMPACT_CATEGORIES.HEALTH}
        />
        <ImpactSlider
          showFilter={showFilter}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.ECOSYSTEM)
          }
          value={values.ecosystem}
          timeValues={timeValues}
          icon={icons.positive.ecosystem}
          impactCategory={IMPACT_CATEGORIES.ECOSYSTEM}
        />
        <ImpactSlider
          showFilter={showFilter}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.WATER)
          }
          value={values.water}
          timeValues={timeValues}
          icon={icons.positive.water}
          impactCategory={IMPACT_CATEGORIES.WATER}
        />
        <ImpactSlider
          showFilter={showFilter}
          onChange={values =>
            this.handleChange(values, IMPACT_CATEGORIES.WASTE)
          }
          value={values.waste}
          timeValues={timeValues}
          icon={icons.positive.waste}
          impactCategory={IMPACT_CATEGORIES.WASTE}
        />

        <ButtonsWrap>
          {!inModal && filterIsChanged && (
            <Fragment>
              <ClearAllButton
                onClick={() => {
                  this.resetFilter()
                  this.props.onReset()
                }}
              >
                <ClearAllIcon />
              </ClearAllButton>
              <FormattedMessage id="app.actionsPage.clearAllFilters" />
            </Fragment>
          )}
        </ButtonsWrap>

        {inModal && filterIsChanged && (
          <ButtonSubmit onClick={this.onSubmit}>
            <FormattedMessage id="app.form.submit" />
          </ButtonSubmit>
        )}
      </Fragment>
    )
  }
}

ActionsFilters.propTypes = {
  onAfterChange: PropTypes.func.isRequired,
  timeValues: PropTypes.array,
  onReset: PropTypes.func,
  closeModal: PropTypes.func,
  values: PropTypes.object,
  showFilter: PropTypes.bool.isRequired,
  inModal: PropTypes.bool,
  intl: intlShape,
}

export default ActionsFilters
