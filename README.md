# Feature Tests

## Getting started

Set the following environment variables (use a user linked with emis web, as per [these instructions](https://github.com/emisgroup/users-api/wiki/Linking-with-emis-web)):

- `XGP_USERNAME`
- `XGP_PASSWORD_DEV`
- `XGP_MFA_DEV`
- `XGP_ROLE_DEV`
- `XGP_PASSWORD_INT`
- `XGP_MFA_INT`
- `XGP_ROLE_INT`
- `XGP_PASSWORD_STG`
- `XGP_MFA_STG`
- `XGP_ROLE_STG`

Don't forget to `npm install`

Then `npx playwright install --with-deps` and `npm install uuid`

### Visual Tests Setup

To run visual tests, ensure the following dependencies are installed:

`npm install pixelmatch --save-dev`
`npm install pngjs`

## Run the tests

`npm run test:standalone`
`npm run test:dev`
`npm run test:int`
`npm run test:stg`
`npm run test:local`

Previews require a URL passing in like so:

- `npx cross-env URL=<PREVIEW_URL> playwright test --project preview`

Each respective environment is defined using [projects](https://playwright.dev/docs/test-projects), so we have a project for `localhost`, `standalone (dev)`, `int`, `stg`.

Project names can be found within [`playwright.config.ts`](./playwright.config.ts)

```json
  projects: [
    ...
      name: "dev",
    ...
      name: "int",
    ...
      name: "stg",
    ...
      name: "standalone",
    ...
      name: "local",
    ...
```

See the [playwright documentation](https://playwright.dev/docs/test-cli) for more cli arguments.

## Debug tests

See [debugging tests](https://playwright.dev/docs/running-tests#debugging-tests) for information on various ways to debug the tests.

## EPS / CIS2 login tests

EPS end to end tests need an CIS2 authentication.

This needs to be [manually acquired](#manually-acquiring-nhs-authentication-session) through YubiKey or smartcard, extracted and then inputted at runtime.

These tests are tagged with `@CIS2` tag. This is abstracted in the `playwright.config.ts` file with the `cis2-` prefix for the projects.

To run EPS / CIS2 tests run the following command:

`npx playwright test --project cis2-int`

To exclude CIS2 dependant tests, use the following command:

`npx playwright test --project int`

### Manually acquiring NHS authentication session

#### Prerequisites

To authenticate for the tests you need to get the session storage from the browser, when manually logged in.

The Chrome extension [StorageAce](https://chromewebstore.google.com/detail/storageace/cpbgcbmddckpmhfbdckeolkkhkjjmplo?hl=en) can be used to do this.

#### Steps

1. Insert YubiKey
1. Navigate to the test environment and login using YubiKey
1. Once logged in, open the `StorageAce` extension
1. Select "Sesssion Storage" radio button and press the export button. This will download a file.
1. Copy the file to the following folder: `playwright-e2e/utils/`
1. Rename this file to `session-storage.txt`
1. The objects within the file need to be parsed and base64 encoded. Run the following command:

   ```bash
   node parseCIS2token.js
   ```

1. This will create a file called `cis2.txt`. Copy the contents into the clipboard.

##### Running in GitHub Actions

1. In GutHub actions, select the EPS E2E Automation - Manual workflow.
1. Select the `Run workflow` button.
1. Select the environment you want to run the tests against.
1. Paste the contents of `cis2.txt` into the `enter a valid CIS2 session` parameter.
1. Press the `Run workflow` button.

##### Running locally

1. Paste the contents of the `cis2.txt` file into the following environment variable:

   - `CIS2_CONFIG`

1. Run the command to run the tests.

```bash
  npx playwright test --project cis2-int
```
