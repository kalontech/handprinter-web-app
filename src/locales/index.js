import { addLocaleData } from 'react-intl'

import deLocaleData from 'react-intl/locale-data/de'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'
import frLocaleData from 'react-intl/locale-data/fr'
import nlLocaleData from 'react-intl/locale-data/nl'
import ptLocaleData from 'react-intl/locale-data/pt'
import zhLocaleData from 'react-intl/locale-data/zh'

import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import nl from './nl.json'
import pt from './pt.json'
import zh from './zh_CN.json'

addLocaleData([
  ...deLocaleData,
  ...enLocaleData,
  ...esLocaleData,
  ...frLocaleData,
  ...nlLocaleData,
  ...ptLocaleData,
  ...zhLocaleData,
])

export default {
  de,
  en,
  es,
  fr,
  nl,
  pt,
  zh,
}
