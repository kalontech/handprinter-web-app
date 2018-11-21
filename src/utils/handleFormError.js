/*
 * How it works:
 * 1. Compares specified property between previous and current props;
 * 2. Sets error message to formError field.
 *
 * Expects to have in parent component:
 * - form to be injected;
 * - intl to be injected;
 * - formError field to be present on form.
 *
 * Expects to receive three arguments:
 * - Property to watch (relatively to the root of props object string);
 * - Previous props object (the first argument of componentDidUpdate);
 * - Current props object (this.props).
 */

const handleFormError = (propertyToWatch, prevProps, currProps) => {
  const {
    form: { setFields },
    intl: { formatMessage },
    [propertyToWatch]: value,
  } = currProps
  if (prevProps[propertyToWatch] !== value) {
    setFields({
      formError: {
        errors: value ? [new Error(formatMessage({ id: value }))] : [],
      },
    })
  }
}

export default handleFormError
