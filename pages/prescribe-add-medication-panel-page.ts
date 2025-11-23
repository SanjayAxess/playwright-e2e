import type { Locator, Page } from "@playwright/test";
import { ComboBox, DosageComboBox, SearchComboBox, TextBox, DateInput, Checkbox } from "../types";

type AddMedication_Buttons = {
  addAndAddAnother: Locator;
  addAndIssue: Locator;
  cancelAdd: Locator;
  addandIssue_expandAndCollapse: Locator;
  addAndIssue_afterExpand: Locator;
  clinicalWarningsErrorBanner_TryAgain: Locator;
}

type PrescriptionType_RadioGroup = {
  formElement: Locator;
  acute: Locator;
  acuteLabel: Locator;
  repeat: Locator;
  repeatLabel: Locator;
  repeatDispensing: Locator;
  repeatDispensingLabel: Locator;
  repeatDispensingInput: Locator;
};

type PrescriptionOptions_Checkbox = {
  formElement: Locator; 
  personallyAdministered: Locator;
  personallyAdministeredLabel: Locator;
  stiUse: Locator;
  variableUse: Locator;
  sls: Locator;
  contraceptiveUse: Locator;
  assortedFlavours: Locator;
};

type PrescribeDiscardButton_Options = {
  discardWarningdialog: Locator;
  discarddialogContent: Locator;
  discardDialogXButton: Locator;
  discardDialogCancelButton: Locator;
  discardDialogDiscardMedicationButton: Locator;
};


export class AddMedicationPanelPage {
  private _button: AddMedication_Buttons;
  private _addMedicationTab: Locator;
  private _medicationSearch: SearchComboBox;
  private _dosage: DosageComboBox;
  private _quantity: TextBox;
  private _duration: TextBox;
  private _prescriptionType: PrescriptionType_RadioGroup;
  private _durationSixMonthswarningsCheckbox: Checkbox;
  private _maximumQuantitywarningsCheckbox: Checkbox;
  private _numberOfAuthorisedIssues: TextBox;
  private _prescriptionOptions: PrescriptionOptions_Checkbox;
  private _authorisingClinician: ComboBox;
  private _informationForPharmacy: TextBox;
  private _informationForPatient: TextBox;
  private _reviewDate: DateInput;
  private _cdDrug30DayswarningsCheckbox: Checkbox;
  private _prescribeDiscardButton: PrescribeDiscardButton_Options;

  constructor(private readonly _page: Page) { }

  get button(): AddMedication_Buttons {
    if (!this._button) {
      this._button = {
        addAndAddAnother: this._page.getByTestId("prescribeDrug-addAndAddAnotherMediumViewPort"),
        addAndIssue: this._page.getByTestId("prescribeDrug-addAndIssueMediumViewPort"),
        cancelAdd: this._page.getByTestId("prescribeDrug-updateCancel"),
        addandIssue_expandAndCollapse: this._page.getByTestId("prescribeDrug-updateExpandButton"),
        addAndIssue_afterExpand: this._page.getByTestId("prescribeDrug-addAndIssueSmallViewPort"),
        clinicalWarningsErrorBanner_TryAgain: this._page.getByTestId("clinical-warning-api-failure-try-again-button-testId")
      };
    }
    return this._button;
  }

  get addMedicationTab(): Locator {
    return (this._addMedicationTab ??= this._page.getByTestId("meds-pkg-prescribe-tab"));
  }

  get medicationSearch(): SearchComboBox {
    if (!this._medicationSearch) {
      const formElement = this._page.getByTestId("medicationSearchFormElement");
      this._medicationSearch = {
        formElement: formElement,
        input: formElement.getByRole("combobox", { name: "medicationSearch" }),
        clearButton: formElement.locator("//button[contains(@class,'Combobox_clear')]"),
        editMedication: formElement.getByTestId("edit-medication"),
        selectedMedication: formElement.getByTestId("custom-medication"),
        option: (option: string) => this._page.getByRole("option", { name: option }),
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._medicationSearch;
  }

  get dosage(): DosageComboBox {
    if (!this._dosage) {
      const formElement = this._page.getByTestId("dosageFormElement");
      this._dosage = {
        formElement: formElement,
        input: formElement.getByRole("combobox", { name: "dosage" }),
        dropDownButton: formElement.locator("//button[@aria-label='Show suggestions']"),
        clearButton: formElement.locator("//button[contains(@class,'Combobox_clear')]"),
        editDosage: formElement.getByTestId("edit-dosage"),
        selectedDosage: formElement.getByTestId("custom-dosage"),
        option: (option: string) => this._page.getByRole("option", { name: option }),
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._dosage;
  }

  get duration(): TextBox {
    if (!this._duration) {
      const formElement = this._page.getByTestId("durationFormElement");
      this._duration = {
        textBox: formElement.getByTestId("prescribeDrug-duration"),
        formElement: formElement,
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._duration;
  }

  get quantity(): TextBox {
    if (!this._quantity) {
      const formElement = this._page.getByTestId("quantityFormElement");
      this._quantity = {
        textBox: formElement.getByTestId("prescribeDrug-quantity"),
        Label: formElement.getByTestId("prescribeDrug-quantityUom"),
        formElement: formElement,
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._quantity;
  }

  get durationSixMonthswarningsCheckbox(): Checkbox {
    if (!this._durationSixMonthswarningsCheckbox) {
      this._durationSixMonthswarningsCheckbox = {
        formElement: this._page.getByTestId("duration-6-months-warning-banner"),
        checkbox: this._page.getByTestId("duration-6-months-warning-accept-checkbox")
      }
    }
    return this._durationSixMonthswarningsCheckbox;
  }

  get maximumQuantitywarningsCheckbox(): Checkbox {
    if (!this._maximumQuantitywarningsCheckbox) {
      this._maximumQuantitywarningsCheckbox = {
        formElement: this._page.getByTestId("maximumQuantityWarning-banner"),
        checkbox: this._page.getByTestId("maximumQuantityWarning-accept-checkbox")
      }
    }
    return this._maximumQuantitywarningsCheckbox;
  }

  get cdDrug30DayswarningsCheckbox(): Checkbox {
    if (!this._cdDrug30DayswarningsCheckbox) {
      this._cdDrug30DayswarningsCheckbox = {
        formElement: this._page.getByTestId("duration-cd-30-days-warning-banner"),
        checkbox: this._page.getByTestId("duration-cd-30-days-warning-accept-checkbox")
      }
    }
    return this._cdDrug30DayswarningsCheckbox;
  }
  
  get prescriptionType(): PrescriptionType_RadioGroup {
    if (!this._prescriptionType) {
      this._prescriptionType = {
        formElement: this._page.getByTestId("prescriptionTypeFormElement"),
        acute: this._page.getByTestId("prescriptionType-option-acute-acute-input"),
        acuteLabel: this._page.getByTestId("prescriptionType-option-acute-acute"),
        repeat: this._page.getByTestId("prescriptionType-option-repeat-repeat-input"),
        repeatLabel: this._page.getByTestId("prescriptionType-option-repeat-repeat-label"),
        repeatDispensing: this._page.getByTestId("prescriptionType-option-repeatdispensing-repeatdispensing-input"),
        repeatDispensingLabel: this._page.getByTestId("prescriptionType-option-repeatdispensing-repeatdispensing"),
        repeatDispensingInput: this._page.getByTestId("prescriptionType-option-repeatdispensing-repeatdispensing-label"),
      };
    }
    return this._prescriptionType;
  }

  get numberOfAuthorisedIssues(): TextBox {
    if (!this._numberOfAuthorisedIssues) {
      const formElement = this._page.getByTestId("numberOfIssuesFormElement");
      this._numberOfAuthorisedIssues = {
        textBox: formElement.getByTestId("prescribeDrug-numberOfIssues"),
        formElement: formElement,
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._numberOfAuthorisedIssues;
  }
  
  get prescriptionOptions(): PrescriptionOptions_Checkbox {
    if (!this._prescriptionOptions) {
      const checkbox = this._page.getByTestId("prescribeOptions");
      this._prescriptionOptions = {
        formElement: checkbox,
        personallyAdministered: this._page.getByTestId("personally-administered-checkbox"),
        personallyAdministeredLabel: this._page.getByTestId("personally-administered-checkboxDiv"),
        stiUse: this._page.getByTestId("sti-checkbox"),
        variableUse: this._page.getByTestId("variable-checkbox"),
        contraceptiveUse: this._page.getByTestId("cc-checkbox"),
        sls: this._page.getByTestId("sls-checkbox"),
        assortedFlavours: this._page.getByTestId("assorted-flavour-checkbox")
      };
    }
    return this._prescriptionOptions;
  }

  get authorisingClinician(): ComboBox {
    if (!this._authorisingClinician) {
      const formElement = this._page.getByTestId("authorizingClinicianField");
      this._authorisingClinician = {
        formElement: formElement,
        input: formElement.getByRole("combobox", { name: "Authorising clinician" }),
        dropDownButton: formElement.locator("//button[@aria-label='Show suggestions']"),
        clearButton: formElement.locator("//button[contains(@class,'Combobox_clear')]"),
        option: (option: string) => this._page.getByRole("option", { name: option }),
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._authorisingClinician;
  }

  get informationForPharmacy(): TextBox {
    if (!this._informationForPharmacy) {
      const formElement = this._page.getByTestId("informationForPharmacyField");
      this._informationForPharmacy = {
        textBox: formElement.getByTestId("informationForPharmacy"),
        formElement: formElement,
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._informationForPharmacy;
  }
  
  get informationForPatient(): TextBox {
    if (!this._informationForPatient) {
      const formElement = this._page.getByTestId("informationForPatientField");
      this._informationForPatient = {
        textBox: formElement.getByTestId("informationForPatient"),
        formElement: formElement,
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._informationForPatient;
  }

  get reviewDate(): DateInput {
    if (!this._reviewDate) {
      const formElement = this._page.getByTestId("individualReviewDateFormElement");
      this._reviewDate = {
        input: formElement.getByTestId("prescribeDrug-individualReviewDate"),
        formElement: formElement,
        calendarIcon: formElement.getByRole("button", { name: "Select date" }),
        month: this._page.locator("//select[@name='months']"),
        year: this._page.locator("//select[@name='years']"),
        date: (date: string) => this._page.getByRole("gridcell").getByText(date),
        option: (option: string) => this._page.getByRole("option", { name: option }),
        error: (testId: string) => this._page.getByTestId(testId)
      };
    }
    return this._reviewDate;
  }

  get medicationValidationBanner(): Locator {
    return this._page.getByTestId("validation-banner-content");
  }

  get medicationClinicalWarningValidationBanner(): Locator {
    return this._page.getByTestId("clinical-warning-api-failure-banner-testId");
  }

  get prescribeDiscardButton(): PrescribeDiscardButton_Options {
    if (!this._prescribeDiscardButton) {
      this._prescribeDiscardButton = {
        discardWarningdialog: this._page.getByTestId('medsDiscardWarning'),
        discarddialogContent: this._page.getByTestId('dialog-content'),
        discardDialogXButton: this._page.getByTestId('dialog-header-close-button'),
        discardDialogCancelButton: this._page.getByTestId('medsWarningCancelButton'),
        discardDialogDiscardMedicationButton: this._page.getByTestId('medsWarningDiscardButton')
      };
    }
    return this._prescribeDiscardButton;
  }

  get editMedicationIcon(): Locator {
    return this._page.getByTestId("edit-medication");
  }

  get alertTag(): Locator {
      return this._page.getByTestId("medsAlertTag");
  }
  
  get cytotoxicTag(): Locator {
    return this._page.getByTestId("medsCytotoxicTag");
  }

  get positionOfLHSTags(): Locator {
    return this._page.getByTestId("medicationSearchItemLHSTags");
  }

  get nonFormularyTag(): Locator {
    return this._page.getByTestId("medsNon-FormularyTag");
  }

  get nonDmdTag(): Locator {
    return this._page.getByTestId("medsNon-dmdTag");
  }

  get positionOfRHSTags(): Locator {
    return this._page.getByTestId("medicationSearchRHSTags");
  }

  get showPackDetailsCheckBox(): Locator {
    return this._page.getByTestId("formElementShowPackDetails");
  }
  
  get medicationSearchItemList(): Locator {
    return this._page.getByTestId("medicationSearchItemContainer");
  }
  
  get packDetails(): Record<string, Locator> {
    return {
      packDetail47154: this._page.getByTestId("packDetail47154"),
      packDetail235339: this._page.getByTestId("packDetail235339"),
      packDetail85084: this._page.getByTestId("packDetail85084")
    };
  }

  get maximumQuantitywarningsCheckboxError(): Locator {
    return this._page.getByTestId("test-accept-the-risk-to-continue");
  }
 
}