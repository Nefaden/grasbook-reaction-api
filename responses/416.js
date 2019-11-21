require('dotenv').config();

const contentSize = process.env.CONTENT_SIZE;
const maxRange = process.env.MAX_RANGE;
const requestedRange = process.env.REQUESTED_RANGE;

const responseJson = {
  '416': {
    description: 'Requested range unsatisfiable',
    examples: {
      'application/json': {
        message: `Requested range unsatisfiable: Content Range: ${requestedRange}-${maxRange} / ${contentSize}`
      }
    }
  }
};

module.exports = responseJson;
