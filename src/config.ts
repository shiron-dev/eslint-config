import type { TypedFlatConfigItem } from "@antfu/eslint-config";
import type { Linter } from "eslint";
import type { Awaitable, FlatConfigComposer } from "eslint-flat-config-utils";

export const shironConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[] = [
  {
    rules: {
      "style/quotes": [
        "error",
        "double",
      ],
      "style/semi": [
        "error",
        "always",
      ],
    },
  },
  {
    files: ["pnpm-workspace.yaml"],
    // antfu's config enforces `trustPolicy: "no-downgrade"` on pnpm-workspace.yaml,
    // which cannot be satisfied by tools whose dependency tree contains a trust
    // downgrade (e.g. renovate -> semver), so installs are rejected outright.
    // Keep `shellEmulator` but drop the `trustPolicy` requirement.
    name: "shiron/pnpm/relax-trust-policy",
    rules: {
      "pnpm/yaml-enforce-settings": [
        "error",
        {
          settings: {
            shellEmulator: true,
          },
        },
      ],
    },
  },
];
