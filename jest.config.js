const config = {
    preset: "ts-jest/presets/default-esm", // Use the ESM preset for ts-jest
    testEnvironment: "node", // Use Node.js environment
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1", // Map .js imports to .ts files
    },
    extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ES modules
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true, // Enable ESM support in ts-jest
            },
        ],
    },
};
export default config;
