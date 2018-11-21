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
})
