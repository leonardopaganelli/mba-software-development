module.exports = {
  resetMocks: true,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "es2021",
        },
      },
    ],
  },
  testRegex: ".spec.ts$",
};
