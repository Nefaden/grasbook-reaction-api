const responseJson = json => ({
  '200': {
    description: 'OK',
    examples: {
      'application/json': json
    }
  }
});

module.exports = responseJson;
