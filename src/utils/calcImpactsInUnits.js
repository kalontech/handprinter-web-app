export const calcImpactsInUnits = actions => {
  const climateHandprint = action => action.impactsInUnits.handprint.climate
  const ecosystemHandprint = action => action.impactsInUnits.handprint.ecosystem
  const healthHandprint = action => action.impactsInUnits.handprint.health
  const wasteHandprint = action => action.impactsInUnits.handprint.waste
  const waterHandprint = action => action.impactsInUnits.handprint.water

  const climateFootprint = action => action.impactsInUnits.footprint.climate
  const ecosystemFootprint = action => action.impactsInUnits.footprint.ecosystem
  const healthFootprint = action => action.impactsInUnits.footprint.health
  const wasteFootprint = action => action.impactsInUnits.footprint.waste
  const waterFootprint = action => action.impactsInUnits.footprint.water

  const sum = (prev, next) => prev + next

  return {
    handprint: {
      climate: actions.map(climateHandprint).reduce(sum),
      ecosystem: actions.map(ecosystemHandprint).reduce(sum),
      health: actions.map(healthHandprint).reduce(sum),
      waste: actions.map(wasteHandprint).reduce(sum),
      water: actions.map(waterHandprint).reduce(sum),
    },
    footprint: {
      climate: actions.map(climateFootprint).reduce(sum),
      ecosystem: actions.map(ecosystemFootprint).reduce(sum),
      health: actions.map(healthFootprint).reduce(sum),
      waste: actions.map(wasteFootprint).reduce(sum),
      water: actions.map(waterFootprint).reduce(sum),
    },
  }
}
