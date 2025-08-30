import { test, expect } from "@playwright/test";
import { User } from "../../valueObjects/NewUser";
import { AppContext } from "../../steps/AppContext";
import { LoginSteps } from "../../steps/LoginSteps";
import { Errors } from "./constants/Errors";
import { ErrorField } from "./constants/ErrorFields";

test.describe("Login flow testing", () => {
  let user: User;
  let loginSteps: LoginSteps;
  let appContext: AppContext;

  test.beforeEach(async ({ page }) => {
    appContext = new AppContext(page);
    loginSteps = new LoginSteps(appContext);
  });

  test("Directly open login page and login user", async () => {
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(
      process.env.LOGIN as string,
      process.env.PASSWORD as string,
    );

    expect(await loginSteps.assertSuccess()).toBeTruthy();
  });

  test("Directly open login page, enter incorrect credentials and get error", async () => {
    user = User.generateRandomUser();
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(user.email, user.password);

    expect(
      await loginSteps.assertErrorText(ErrorField.General, Errors.LOGIN_ERROR),
    );
  });

  test("Directly open login page, enter incorrect email format and get error", async () => {
    user = User.generateUserWithInvalidEmail();
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(user.email, user.password);

    expect(
      await loginSteps.assertErrorText(ErrorField.Email, Errors.LOGIN_INVALID),
    );
  });

  test("Directly open login page, don't enter credentials and get errors", async () => {
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(null, null);

    expect(
      await loginSteps.assertErrorText(ErrorField.Email, Errors.LOGIN_REQUIRED),
    );

    expect(
      await loginSteps.assertErrorText(
        ErrorField.Password,
        Errors.PASSWORD_REQUIRED,
      ),
    );
  });

  test("Check availability of forgot password button", async () => {
    await loginSteps.openPage();
    await loginSteps.goToForgotPassAndCheckRedirection();
  });

  test("Check the redirection to registration from login page", async () => {
    await loginSteps.openPage();
    await loginSteps.goToRegistrationFromSignIn();
  });
});
