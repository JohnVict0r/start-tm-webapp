
// eslint-disable-next-line
export function setFormWithError(form, { errors }) {
  const mapErrors = Object.keys(errors).reduce(
    (accum, key) => ({
      ...accum,
      [key]: {
        value: form.getFieldValue(key),
        errors: errors[key].map(err => new Error(err)),
      },
    }),
    {}
  );

  form.setFields(mapErrors);
}
