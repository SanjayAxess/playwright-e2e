import { Locator } from "@playwright/test";

export type TextBox = {
  textBox: Locator;
  Label?: Locator;
  formElement: Locator;
  error: (testId: string) => Locator;
};

export type ComboBoxBase = {
  formElement: Locator;
  input: Locator;
  clearButton: Locator;
  option: (option: string) => Locator;
  error: (testId: string) => Locator;
};

export type ComboBox = {
  dropDownButton: Locator;
} & ComboBoxBase;

export type DosageComboBox = {
  editDosage: Locator;
  selectedDosage: Locator;
  dropDownButton: Locator;
} & ComboBoxBase;

export type SearchComboBox = {
  editMedication: Locator;
  selectedMedication: Locator;
} & ComboBoxBase;

export type FormInput = {
  input: Locator;
  formElement: Locator;
};

export type DateInput = {
  input: Locator;
  formElement: Locator;
  calendarIcon: Locator;
  month: Locator;
  year: Locator;
  date: (date: string) => Locator;
  option: (option: string) => Locator;
  error: (testId: string) => Locator;
};

export type Checkbox = {
  checkbox: Locator;
  formElement: Locator;
};