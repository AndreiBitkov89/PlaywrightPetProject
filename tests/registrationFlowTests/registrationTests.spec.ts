import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage/RegistrationPage";
import { User } from "../../valueObjects/NewUser";
import { Errors } from "./constants/Errors";
import { ErrorField } from "./constants/ErrorFields";
import { RegistrationSteps } from "../../steps/RegistrationSteps";
import { AppContext } from "../../steps/AppContext";
import { faker } from "@faker-js/faker";

test.describe("Registration flow", () => {
  let user: User;
  let registrationPage: RegistrationPage;
  let steps: RegistrationSteps;
  let appContext: AppContext;

  test.beforeEach(async ({ page }) => {
    appContext = new AppContext(page);
    registrationPage = new RegistrationPage(page);
    steps = new RegistrationSteps(appContext);
  });

  test("Directly open registration page and create new account", async () => {
    user = User.generateRandomUser();

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();

    expect(await steps.assertSuccess()).toBeTruthy();
  });

  test("Submit button disabled without accepted terms", async ({}) => {
    user = User.generateRandomUser();

    await steps.openPage();
    await steps.fillFields(user);
    expect(await steps.assertButtonSubmitDisabled()).toBeTruthy();
  });

  test("Error after registration with empty name", async ({}) => {
    user = User.generateWithEmptyFields(["firstName"]);

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();
    await steps.assertErrorText(ErrorField.FirstName, Errors.NAME_REQUIRED);
  });

  test("Error after registration with empty surname", async ({}) => {
    user = User.generateWithEmptyFields(["lastName"]);

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();
    await steps.assertErrorText(ErrorField.Surname, Errors.SURNAME_REQUIRED);
  });

  test("Error after registration with empty email", async ({}) => {
    user = User.generateWithEmptyFields(["email"]);

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();
    await steps.assertErrorText(ErrorField.Email, Errors.EMAIL_REQUIRED);
  });

  test("Error after registration with empty password", async ({}) => {
    user = User.generateWithEmptyFields(["password"]);

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();
    await steps.assertErrorText(ErrorField.Password, Errors.PASSWORD_REQUIRED);
    await steps.assertErrorText(
      ErrorField.ConfirmPassword,
      Errors.CONFIRM_PASSWORD_REQUIRED,
    );
  });

  test("Error after registration with invalid email", async ({}) => {
    user = User.generateUserWithInvalidEmail();

    await steps.openPage();
    await steps.fillFields(user);
    await steps.checkTerms();
    await steps.submit();
    await steps.assertErrorText(ErrorField.Email, Errors.EMAIL_INVALID);
  });

  test("Error after confirmation registration with different password", async ({}) => {
    user = User.generateRandomUser();

    await steps.openPage();
    await steps.fillFields(user, faker.internet.password());
    await steps.checkTerms();
    await steps.submit();
    expect(
      await registrationPage.isValidationFailed(ErrorField.ConfirmPassword),
    ).toBeTruthy();
  });
});
