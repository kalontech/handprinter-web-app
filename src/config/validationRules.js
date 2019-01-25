import { MAX_INVITING_MESSAGE_LENGTH } from '../config/common'

export default formatMessage => ({
  country: [
    {
      required: true,
      message: formatMessage({
        id: 'app.forms.country.required',
      }),
    },
  ],
  email: [
    {
      required: true,
      message: formatMessage({
        id: 'app.forms.email.required',
      }),
    },
    {
      type: 'email',
      message: formatMessage({
        id: 'app.forms.email.invalid',
      }),
    },
  ],
  fullName: [
    {
      required: true,
      message: formatMessage({
        id: 'app.forms.fullName.required',
      }),
    },
  ],
  password: [
    {
      required: true,
      message: formatMessage({
        id: 'app.forms.password.required',
      }),
    },
    {
      min: 8,
      message: formatMessage({
        id: 'app.forms.password.tooShort',
      }),
    },
    {
      max: 64,
      message: formatMessage({
        id: 'app.forms.password.tooLong',
      }),
    },
  ],
  invitingMessage: [
    {
      max: MAX_INVITING_MESSAGE_LENGTH,
      message: formatMessage({
        id: 'app.forms.invitingMessage.maxLength',
      }, {
          maxLength: MAX_INVITING_MESSAGE_LENGTH
      }),
    },
  ],
})

export const required = message => ({
  required: true,
  message,
})

export const fileSize = ({ message, ...params }) => (
  { field },
  value,
  callback,
) => {
  callback(
    value && value.file.size > params.maxSize
      ? [{ message, field }]
      : undefined,
  )
}

export const imageDimensions = ({ message, ...params }) => (
  { field },
  value,
  cb,
) => {
  if (!value) return cb()

  let image = new Image()
  image.src = value.fileUrl

  image.addEventListener('load', () => {
    const { width, height } = image

    cb(
      width >= params.width || height >= params.height
        ? undefined
        : [{ message, field }],
    ) // eslint-disable-line standard/no-callback-literal

    image = undefined
  })
}
