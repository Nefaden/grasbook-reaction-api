const { Op } = require('sequelize');

const sortByKey = (array, key, order) => {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (order === 'ASC') {
      return x.localeCompare(y);
    }
    return y.localeCompare(x);
  });
};

const formatQueryiLike = (whereParams, inclusionList) => {
  const where = { ...whereParams };
  Object.keys(where).map(key => {
    if (inclusionList.find(value => key === value)) {
      const str = `%${where[key]}%`;
      where[key] = {
        [Op.iLike]: str
      };
      return 1;
    }
    return 0;
  });
  return where;
};

module.exports = { sortByKey, formatQueryiLike };
