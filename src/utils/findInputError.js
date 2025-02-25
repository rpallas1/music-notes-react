export default function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((obj, key) => {
      return Object.assign(obj, { error: errors[key] });
    }, {});

  return filtered;
}
