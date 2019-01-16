import { addLocaleData } from 'react-intl'

import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'
import ptLocaleData from 'react-intl/locale-data/pt'

import en from './en.json'
import es from './es.json'
import pt from './pt.json'

addLocaleData([...enLocaleData, ...esLocaleData, ...ptLocaleData])

export default {
  en,
  es,
  pt,
}
