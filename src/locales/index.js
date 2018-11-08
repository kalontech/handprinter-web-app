import { addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'

import en from './en'
import es from './es'

addLocaleData([...enLocaleData, ...esLocaleData])

export default {
  en,
  es,
}
