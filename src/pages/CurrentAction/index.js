import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'

import backgroundOceanContainerImage from 'assets/images/backgroundOceanContainer.png'
import { OceanContainer } from 'components/Styled'
import CurrentActionSuccess from 'components/CurrentActionSuccess'
import ActionOpenView from 'components/ActionOpenView'
import Spinner from 'components/Spinner'
import ActionCreateForm from 'components/ActionCreateForm'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import fetch from 'utils/fetch'
import * as apiActions from 'api/actions'
import { Creators } from 'redux/actions'

import Compress from 'compress.js'

const Container = styled(OceanContainer)`
  ${media.tablet`
    background-color: ${colors.ocean};
    background-image: url(${backgroundOceanContainerImage});
    background-position: right bottom;
    background-repeat: no-repeat; 
  `}
`

const PAGE_TYPES = {
  PREVIEW: 'preview',
  EDIT: 'edit',
  CREATE: 'create',
  SUCCESS: 'success',
}

class CurrentActionPage extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.oneOf(Object.values(PAGE_TYPES)),
      }),
    }),
    history: PropTypes.object,
    loading: PropTypes.bool,
    action: PropTypes.object,
    intl: intlShape,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  handleSubmit = async values => {
    const { match, action, history } = this.props

    const body = new FormData()

    if (values.photo && values.photo.file) {
      const compress = new Compress()
      const compressed = await compress.compress([values.photo.file], {
        size: 1,
        quality: 1,
        maxWidth: 1920,
        maxHeight: 1920,
        resize: true,
      })
      const base64str = compressed[0].data
      const imgExt = compressed[0].ext
      const file = Compress.convertBase64ToFile(base64str, imgExt)
      body.append('picture', file)

      const compressedPreview = await compress.compress([values.photo.file], {
        size: 0.1,
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        resize: true,
      })
      const base64strPreview = compressedPreview[0].data
      const imgExtPreview = compressedPreview[0].ext
      const preview = Compress.convertBase64ToFile(
        base64strPreview,
        imgExtPreview,
      )
      body.append('picturePreview', preview)
    }

    body.append('description', values.description)
    body.append('name', values.name)
    body.append('category', values.category)

    let request = apiActions.fetchProposedAction

    if (match.params.slug) request = apiActions.fetchAction

    await request({
      body,
      id: action && action._id,
      method: match.params.slug ? 'PUT' : 'POST',
    })

    history.push(`/account/actions/success/${match.params.slug || ''}`)
  }

  render() {
    const { match, loading, action, history, intl } = this.props

    let SubPage

    if (match.params.type === PAGE_TYPES.SUCCESS) {
      SubPage = <CurrentActionSuccess />
    } else if (match.params.type === PAGE_TYPES.PREVIEW) {
      SubPage = (
        <ActionOpenView
          action={action}
          cancel={{
            onClick: () => {
              history.goBack()
            },
            message: intl.formatMessage({
              id: 'app.actionCreatePage.cancel',
            }),
          }}
          success={{
            onClick: () => {
              history.push(`/account/actions/edit/${match.params.slug}`)
            },
            message: intl.formatMessage({ id: 'app.actions.card.edit' }),
          }}
        />
      )
    } else {
      SubPage = (
        <ActionCreateForm
          onSubmit={this.handleSubmit}
          initialValues={
            match.params.type === PAGE_TYPES.EDIT ? action : undefined
          }
          onCancel={() => {
            history.goBack()
          }}
        />
      )
    }

    return <Container>{loading ? <Spinner /> : SubPage}</Container>
  }
}

export default compose(
  connect(
    state => ({
      action: state.actions.current,
    }),
    { setCurrentAction: Creators.setCurrentAction },
  ),
  fetch(props => apiActions.fetchAction({ slug: props.match.params.slug }), {
    onSuccess({ setCurrentAction, action }) {
      setCurrentAction(action)
    },
    loader: false,
    inject: false,
    filter({ match }) {
      return Boolean(match.params.slug)
    },
  }),
  injectIntl,
)(CurrentActionPage)
