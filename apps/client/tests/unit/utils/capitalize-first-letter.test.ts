import capitalizeFirstLetter from '../../../src/utils/capitalize-first-letter';

describe('capitalizeFirstLetter', () => {
  it('should capitalize first letter of a word', () => {
    const res = capitalizeFirstLetter('hola');
    expect(res).toBe('Hola');
  });

  it('should only capitalize first letter of first word in a sentence', () => {
    const res = capitalizeFirstLetter('hola amigo mio');
    expect(res).toBe('Hola amigo mio');
  });

  it('should return an empty string when an empty string is provided', () => {
    const res = capitalizeFirstLetter('');
    expect(res).toBe('');
  });

  it('should not change a string if the first letter is already capitalized', () => {
    const res = capitalizeFirstLetter('Hola');
    expect(res).toBe('Hola');
  });
});
