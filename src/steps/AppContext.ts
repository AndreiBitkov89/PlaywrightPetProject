import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";
import { UserNavigationSection } from "../../commonPageElements/UserNavigationSection/UserNavigationSection";
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import { PageWithItems } from "../pages/PageWithItems/PageWithItems";
import { MyFavorites } from "../pages/MyFavoritesPage/MyFavoritesPage";
import { SidebarFilterBy } from "../../commonPageElements/SidebarFilter/SidebarFilterBy";
import { ItemPage } from "../pages/ItemPage/ItemPage";

export class AppContext {
  public loginPage: LoginPage;
  public homePage: HomePage;
  public forgotPasswordPage: ForgotPasswordPage;
  public userNavigationSection: UserNavigationSection;
  public registrationPage: RegistrationPage;
  public pageWithItems: PageWithItems;
  public myFavorites: MyFavorites;
  public sidebarFilter: SidebarFilterBy;
  public itemPage: ItemPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.forgotPasswordPage = new ForgotPasswordPage(page);
    this.userNavigationSection = new UserNavigationSection(page);
    this.registrationPage = new RegistrationPage(page);
    this.pageWithItems = new PageWithItems(page);
    this.myFavorites = new MyFavorites(page);
    this.sidebarFilter = new SidebarFilterBy(page);
    this.itemPage = new ItemPage(page);
  }
}
