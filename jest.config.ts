export default {
  testEnvironment: "jest-environment-node",
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "tsx", "jsx", "json", "node"],
};