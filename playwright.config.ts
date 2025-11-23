import { defineConfig, devices } from "@playwright/test";
import {
  defaultConfig,
  devConfig,
  devProject,
  intConfig,
  intProject,
  localConfig,
  loginProjects,
  previewProject,
  stgConfig,
  stgProject
} from "@emisgroup/xgp-playwright-boilerplate";
import { TestConfig } from "./fixtures/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig<TestConfig>({
  // Extend default configuration
  ...defaultConfig,
  retries: 1,
  timeout: 10 * 60 * 1000,
  fullyParallel: true,
  workers: 1,
  use: {
    headless: true,
    screenshot: "on",
    actionTimeout: 100 * 1000
  },
  expect: {
    timeout: 10 * 1000
  },
  projects: [
    ...loginProjects,
    {
      ...intProject,
      grep: /@regression/
    },
    {
      ...stgProject,
      grep: /@stg/
    },
    {
      ...devProject,
      grep: /@dev/
    },
    {
      ...previewProject,
      grep: /@pr_check/
    },
    {
      name: "cis2-local",
      grep: /@CIS2/,
      dependencies: ["dev-login"],
      use: {
        ...localConfig,
        ...devices["Desktop Chrome"],
        storageState: "storage-state.dev.json"
      }
    },
    {
      name: "cis2-dev",
      grep: /@CIS2/,
      dependencies: ["dev-login"],
      use: {
        ...devConfig,
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "cis2-int",
      grep: /@CIS2/,
      dependencies: ["int-login"],
      use: {
        ...intConfig,
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "cis2-stg",
      grep: /@CIS2/,
      dependencies: ["stg-login"],
      use: {
        ...stgConfig,
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "prod-dev",
      grep: /@view_meds_prod/,
      dependencies: ["dev-login"],
      use: {
        ...devConfig,
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "prod-int",
      grep: /@view_meds_prod/,
      dependencies: ["int-login"],
      use: {
        ...intConfig,
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "prod-stg",
      grep: /@view_meds_prod/,
      dependencies: ["stg-login"],
      use: {
        ...stgConfig,
        ...devices["Desktop Chrome"]
      }
    }
  ]
});