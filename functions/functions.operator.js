const { Op } = require('sequelize');
const AWS = require('aws-sdk');
const lodash = require('lodash');

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

const indexOfEnd = (fullstring, string) => {
  const io = fullstring.indexOf(string);
  return io === -1 ? -1 : io + string.length;
};

const UploadBinaryToUri = async values => {
  const endpoint = process.env.SCALEWAY_ENDPOINT;
  const region = process.env.SCALEWAY_REGION;
  const accessKey = process.env.SCALEWAY_ACESS_KEY;
  const secretKey = process.env.SCALEWAY_SECRET_KEY;
  const bucketName = process.env.SCALEWAY_BUCKET_NAME;

  const client = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region,
    endpoint
  });

  const params = {
    Bucket: `${bucketName}`,
    Key: `reactionApi/${values.name}.${Date.now()}.${values.pictureType}`,
    Body: values.iconBlob,
    ACL: 'public-read'
  };

  if (!lodash.isNull(values.iconBlob) && !lodash.isUndefined(values.iconBlob)) {
    const string = endpoint.substring(indexOfEnd(endpoint, 'https://'));
    client.upload(params, err => {
      if (err) {
        throw err;
      }
    });
    return `https://${bucketName}.${string}${params.Key}`;
  }
  return values.iconUrl;
};

module.exports = {
  sortByKey,
  formatQueryiLike,
  UploadBinaryToUri
};
