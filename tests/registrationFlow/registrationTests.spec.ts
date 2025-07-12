import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { User } from "../../valueObjects/User";
import { Store } from "../../constants/Store";
import { RegistrationSteps } from "../../steps/RegistrationSteps";

test.describe("Registration flow", () => {
  let user: User;
  let registrationPage: RegistrationPage;
  let steps: RegistrationSteps;

  test.beforeEach(async ({ page }) => {
    user = User.generateRandom();
    registrationPage = new RegistrationPage(page);
    steps = new RegistrationSteps(registrationPage);
  });

  test("Directly open registration page and create new account", async () => {
    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.chooseStore(Store.AERIE);
    await steps.submit();
    await steps.assertSuccess();
  });

  test("Submit button disabled without accepted terms", async ({}) => {
    await steps.openPage();
    await steps.fillFields(user);
    await steps.chooseStore(Store.AERIE);
    expect(await registrationPage.isSubmitButtonDisabled()).toBeTruthy();
  });
});
