import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-node",
  extensionsToTreatAsEsm: [".ts"], 
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
};

export default config;
