const lodash = require('lodash');

const successCodeChange = (h, data) => {
  const dataValue = { ...data };
  if (!lodash.isUndefined(data.code)) {
    const { code } = dataValue;
    delete dataValue.code;

    return h.response(dataValue.result).code(code);
  }

  if (h.request.method === 'post') {
    // Warning DANGER ZONE
    if (lodash.isUndefined(data.get('uuid'))) {
      let locationString = '';
      let numberControl = 0;
      lodash.forOwn(data.get(), (val, key) => {
        if (lodash.endsWith(key, 'Uuid')) {
          numberControl += 1;
          if (numberControl <= 2) {
            const keyName = key.substring(0, key.search('Uuid'));
            locationString += `/${keyName}s/${val}`;
          }
        }
      });
      const routeToData = {
        location: locationString
      };
      return h.response(routeToData).code(201);
    }
    const routeToData = {
      location: `${h.request.route.path}${data.get('uuid')}`
    };
    return h.response(routeToData).code(201);
  }

  if (
    (h.request.method === 'delete' && data === 1) ||
    (h.request.method === 'put' && data[0] === 1)
  ) {
    return h.response().code(204);
  }

  return h.response(data).code(200);
};

module.exports = { successCodeChange };
