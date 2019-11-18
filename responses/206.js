const responseJson = json => ({
  '206': {
    description: 'Partial Content',
    examples: {
      'application/json': json
    }
  }
});

module.exports = responseJson;
