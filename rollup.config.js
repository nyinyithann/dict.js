import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.js",
    output: {
      file: "build/cjs/dict.js",
      format: "cjs",
    },
    plugins: [resolve(), commonjs(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "src/index.js",
    output: {
      file: "build/esm/dict.js",
      format: "esm",
    },
    plugins: [resolve(), commonjs(), babel({ babelHelpers: "bundled" })],
  },
];
