import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The standalone duplicate is its own project — lint it from inside sav-clone.
    "sav-clone/**",
    // Slay with Digital is a separate standalone site — lint it from inside slaywithdigital.
    "slaywithdigital/**",
  ]),
]);

export default eslintConfig;
