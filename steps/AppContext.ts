
import { RegistrationPage } from "../pages/RegistrationPage";
import { UserNavigationSection } from "../pages/PageElements/UserNavigationSection";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

export class AppContext {
  public loginPage: LoginPage;
  public homePage: HomePage;
  public forgotPasswordPage: ForgotPasswordPage;
  public userNavigationSection: UserNavigationSection
  public registrationPage: RegistrationPage

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.forgotPasswordPage = new ForgotPasswordPage(page);
    this.userNavigationSection = new UserNavigationSection(page);
    this.registrationPage = new RegistrationPage(page);
  }
}