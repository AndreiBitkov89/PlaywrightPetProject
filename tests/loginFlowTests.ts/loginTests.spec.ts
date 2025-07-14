import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { User } from "../../valueObjects/NewUser";
import { LoginSteps } from "../../steps/LoginSteps";
import { UserNavigationSection } from "../../pages/PageElements/UserNavigationSection";

test.describe("Login flow testing", () => {
  let user: User;
  let loginPage: LoginPage;
  let userSection: UserNavigationSection;
  let loginSteps: LoginSteps;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    userSection = new UserNavigationSection(page);
    loginSteps = new LoginSteps(loginPage, userSection);
  });

  test("Directly open login page and login user", async () => {
    await loginSteps.openPage();
    await loginSteps.fillFieldsAndSubmit(
      process.env.LOGIN as string,
      process.env.PASSWORD as string
    );

    expect(await loginSteps.assertSuccess()).toBeTruthy();
  });
});
