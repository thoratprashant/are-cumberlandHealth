export const ValidationRules = {
  NAME: {
    MAX_LENGTH: 50,
    
    // Letters + single spaces between words
    REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/
  }
};
