const { typeReactionSchema } = require('./typeReactions.validator');
const json = require('./typeReaction.json');

// Change string URL type to uri URL type when merged
delete json.uuid;
describe('typeReaction.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(typeReactionSchema.validate(json).error).toBe(null);
    });

    it('Id fail: null value', () => {
      const falsejson = { ...json, uuid: undefined };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Id fail: not a UUID value', () => {
      const falsejson = { ...json, uuid: 'N0taUUID' };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Icon URL fail: null value', () => {
      const falsejson = { ...json, iconUrl: undefined };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Icon URL fail: not a string value', () => {
      const falsejson = { ...json, iconUrl: 10 };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Icon URL fail: 100 < value.length', () => {
      const falsejson = {
        ...json,
        iconUrl:
          'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbnazertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: null value', () => {
      const falsejson = { ...json, name: undefined };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a string value', () => {
      const falsejson = { ...json, name: 666 };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: 30 < value.length', () => {
      const falsejson = {
        ...json,
        name: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, name: '(-è_çà)=^$ù,;:!' };
      expect(typeReactionSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
