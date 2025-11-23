import { test, expect } from "../../src/fixtures/fixture";
import { LoginErrors } from "../../src/constants/common.const";
import { ErrorFieldLogin } from "../../src/constants/common.const";
import { LoginSteps } from "../../src/steps/LoginSteps";
import { User } from "../../src/valueObjects/NewUser";

test.describe("Login flow tests", () => {
  let user: User;
  let loginSteps: LoginSteps;

  test.beforeEach(async ({ app }) => {
    loginSteps = new LoginSteps(app);
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
      await loginSteps.assertErrorText(
        ErrorFieldLogin.General,
        LoginErrors.LOGIN_ERROR,
      ),
    );
  });

  test("Directly open login page, enter incorrect email format and get error", async () => {
    user = User.generateUserWithInvalidEmail();
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(user.email, user.password);

    expect(
      await loginSteps.assertErrorText(
        ErrorFieldLogin.Email,
        LoginErrors.LOGIN_INVALID,
      ),
    );
  });

  test("Directly open login page, don't enter credentials and get errors", async () => {
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(null, null);

    expect(
      await loginSteps.assertErrorText(
        ErrorFieldLogin.Email,
        LoginErrors.LOGIN_REQUIRED,
      ),
    );

    expect(
      await loginSteps.assertErrorText(
        ErrorFieldLogin.Password,
        LoginErrors.PASSWORD_REQUIRED,
      ),
    );
  });

  test("Check availability of forgot password button", async () => {
    await loginSteps.openPage();
    await loginSteps.goToForgotPassAndCheckRedirection();
  });

  test("Check the redirection to registration from login page", async () => {
    await loginSteps.openPage();
    await loginSteps.goToRegistrationFromSignInAndCheckRedirection();
  });
});
