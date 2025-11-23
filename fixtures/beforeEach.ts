import { expect, Page } from "@playwright/test";
import { TestConfig } from "./test";
import { v4 as uuidv4 } from 'uuid';

export const restoreSessionStorage = async (page: Page) => {
  const sessionStorage = JSON.parse(atob(process.env.CIS2_CONFIG!));
  await page.context().addInitScript((storage: string) => {
    for (const [key, value] of Object.entries<string>(storage)) window.sessionStorage.setItem(key, value);
  }, sessionStorage);
};

const selectPatient = async ({ page, patient, standalone, personGuid }) => {
  if (standalone) {
    // Wait for page to load before selecting a patient
    await expect(page.getByText("Loading...")).toHaveCount(0);
    await page.getByTestId("tui-open-test-ui-button").click({ force: true });
    await page.getByTestId("tui-person-id-input").pressSequentially(personGuid || "", { delay: 1 });
    await page.getByTestId("tui-patient-swap-button").click();
    await page.getByTestId("tui-close-form-button").click();
  } else {
    await patient.searchBox.fill("Faraday Performance Test Two");
    await patient.searchBox.press("Enter");
    await patient.searchResults.getByText("FARADAY, Performance Test Two").click({ force: true });
  }
};

const selectEPSPatient = async ({ page, patient, standalone, personGuid }) => {
  if (standalone) {
    // Wait for page to load before selecting a patient
    await expect(page.getByText("Loading...")).toHaveCount(0);
    await page.getByTestId("tui-open-test-ui-button").click({ force: true });
    await page.getByTestId("tui-person-id-input").pressSequentially(personGuid || "", { delay: 1 });
    await page.getByTestId("tui-patient-swap-button").click();
    await page.getByTestId("tui-close-form-button").click();
  } else {
    await patient.searchBox.fill("BULGER");
    await patient.searchBox.press("Enter");
    await patient.searchResults.getByText("BULGER, Dolly").click({ force: true });
  }
};

export const beforeEachEPSMedication = async ({
  baseURL,
  page,
  patient,
  standalone,
  personGuid,
  previewURL
}: TestConfig) => {
  await restoreSessionStorage(page);
  if (standalone) {
    await page.goto("/");
    await selectEPSPatient({ page, patient, standalone, personGuid });
  } else if (previewURL) {
    // Load via preview URL first and wait for app to be
    // displayed and populate application-discovery in sessionStorage
    await page.goto(previewURL);
    await page.waitForURL(`${baseURL}?appdisc=*`);
    // Ensure page is actually loaded then navigate to medication and select patient
    await page.getByTestId("landing-page").waitFor();
    await page.getByTestId("fixed-primary-navigation-collapsed").getByTestId("menu-group-add-medication").click();
    await selectEPSPatient({ page, patient, standalone, personGuid });
  } else {
    await page.goto(baseURL!);
    // Running in host so select a patient
    await selectEPSPatient({ page, patient, standalone, personGuid });
    // then go to medication page
    await page.getByTestId("fixed-secondary-navigation").getByTestId("secondary-menu-item-medication").click();
    // Print out console logs to assist with debugging
    //page.on("console", (msg) => console.log(msg.text()));
  }
};

export const beforeEachMedication = async ({
  baseURL,
  page,
  patient,
  standalone,
  personGuid,
  previewURL
}: TestConfig) => {
  if (standalone) {
    await page.goto("/");
    await selectPatient({ page, patient, standalone, personGuid });
  } else if (previewURL) {
    // Load via preview URL first and wait for app to be
    // displayed and populate application-discovery in sessionStorage
    await page.goto(previewURL);
    await page.waitForURL(`${baseURL}?appdisc=*`);
    await selectPatient({ page, patient, standalone, personGuid });
    // then go to medication page
    await page.getByTestId("fixed-secondary-navigation").getByTestId("secondary-menu-item-medication").click();
  } else {
    // Running in host so select a patient
    await selectPatient({ page, patient, standalone, personGuid });
    // then go to medication page
    await page.getByTestId("fixed-secondary-navigation").getByTestId("secondary-menu-item-medication").click();
    // Print out console logs to assist with debugging
    //page.on("console", (msg) => console.log(msg.text()));
  }
};

export function generateRandomGuid(): string {
  const randomGuid = uuidv4(); // Generate a random UUID (v4)
  return randomGuid;
}