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

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

export const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};
