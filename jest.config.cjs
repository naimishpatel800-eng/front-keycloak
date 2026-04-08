module.exports = {
  testEnvironment: 'jsdom',            // Simulate browser environment
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use Babel to process TSX/JSX
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Recognize these files
};