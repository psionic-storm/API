module.exports = {
  name: 'psionic-storm-test',
  moduleNameMapper: {
    '^Connection(.*)$': '<rootDir>/src/connection$1',
    '^Constants(.*)$': '<rootDir>/src/constants$1',
    '^Errors(.*)$': '<rootDir>/src/errors$1',
    '^Middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '^Models(.*)$': '<rootDir>/src/model$1',
    '^Routes(.*)$': '<rootDir>/src/routes$1',
    '^Service(.*)$': '<rootDir>/src/service$1',
    '^Types(.*)$': '<rootDir>/src/types$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
  },
};
