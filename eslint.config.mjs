import { createRequire } from "module"

const require = createRequire(import.meta.url)

const coreWebVitals = require("eslint-config-next/core-web-vitals")
const typescript = require("eslint-config-next/typescript")

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**"] },
  ...coreWebVitals,
  ...typescript,
]

export default eslintConfig
