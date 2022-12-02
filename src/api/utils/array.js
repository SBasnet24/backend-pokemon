const arrayEquals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val) => b.includes(val));

module.exports = {
  arrayEquals,
};
