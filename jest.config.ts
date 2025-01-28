// module.exports = {
//   preset: 'ts-jest',
//   testPathIgnorePatterns: ['/node_modules/', '/backend/'],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jsdom', // Change this to 'jsdom' for React components
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!(@babel/runtime|@babel/preset-react|@babel/preset-env|@babel/preset-typescript))' // Update this line to include necessary packages
//   ],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };
import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/backend/'], // Add this line
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)