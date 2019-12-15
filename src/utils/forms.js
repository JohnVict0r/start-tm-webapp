// eslint-disable-next-line
export function setFormWithError(form, { validation }) {
  const mapErrors = Object.keys(validation).reduce(
    (accum, key) => ({
      ...accum,
      [key]: {
        value: form.getFieldValue(validation[key].field),
        errors: new Error(
          validation[key].message,
          validation[key].field,
          validation[key].validation
        ), // [key].map(err => console.log(err)),//new Error(err)),
      },
    }),
    {}
  );
  form.setFields(mapErrors);
}
